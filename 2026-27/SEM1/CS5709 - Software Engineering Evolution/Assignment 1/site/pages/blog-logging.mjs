import { code } from '../html.mjs';
import { original } from '../profile.mjs';

// Republished in full from the original portfolio. Code samples use String.raw
// so PHP and JSON backslashes appear exactly as written.
export default {
  file: 'blog-logging.html',
  title: 'How we solved logging at Appwrite',
  body: `
<p class="eyebrow">By Chirag Aggarwal · April 18, 2026 · <a href="${original}/blog/how-we-solved-logging-at-appwrite">originally published on my portfolio</a></p>
<p>A few weeks back I came across a post by <a href="https://twitter.com/boristane">@boristane</a> sharing a website he made, <a href="https://loggingsucks.com">loggingsucks.com</a>. It caught my eye because it had been shared by my favorite tech YouTuber, <a href="https://twitter.com/theo">@theo</a>. Like most people, I was really inspired by the article and shared it with my team. <a href="https://twitter.com/lukebsilver">@lukebsilver</a>, Appwrite's Engineering Lead, was also inspired by it and decided to work on a new PHP library, utopia-php/span, to fix logging throughout the Appwrite codebase.</p>

<h2>What we had</h2>
<p>Before this, Appwrite used a combination of two different libraries targeting logging in two different areas:</p>
<ul>
  <li><strong>utopia-php/console</strong>: a very simple wrapper library around stdout logging using functions like <code>Console::success()</code>, <code>Console::error()</code>, etc.</li>
  <li><strong>utopia-php/logger</strong>: an adapter-based library to push error logs to monitoring systems like Sentry, AppSignal, Raygun, etc.</li>
</ul>
<p>Combined, these libraries served their purpose for a long time, but we often ran into problems when debugging production issues, the same ones the original article discusses in detail. I'd highly recommend going through <a href="https://loggingsucks.com">that article</a> first so I don't repeat it all here.</p>

<h2>Our solution</h2>
<p>Funnily enough, the first tricky problem was deciding on a name. "Logger" was already taken, so we had to be creative. The word "Span" captured exactly what we were trying to solve: a fundamental unit of work with a named, timed operation alongside various attributes, errors, trace IDs, etc.</p>
<p>The first step was to move away from simple log lines to structured logging. Span enforces this by only exposing a single primary method, <code>add()</code>, which accepts a key-value pair.</p>
<p>Before:</p>
${code(String.raw`
Console::info("Deleting project {$project->getId()} (type={$type}, region={$project->getAttribute('region')})");
`)}
<p>After:</p>
${code(String.raw`
Span::add('project.id', $project->getId());
Span::add('project.type', $type);
Span::add('project.region', $project->getAttribute('region'));
`)}
<p>This massively improved the queryability of our logs, one of the things we struggled with most when going through logs in production.</p>
<p>We also wanted the library to be extremely simple to use. Earlier, with "logger", we had to hop through various dependency injection loops just to use it:</p>
${code(String.raw`
public function action(
    Message $message,
    Document $project,
    Log $log, // ← has to be injected just to add a tag
): void {
    $log->addTag('projectId', $project->getId());
    $log->addTag('type', $payload['type']);
    // ...actual work...
}
`)}
<p>With Span, it's much simpler:</p>
${code(String.raw`
public function action(
    Message $message,
    Document $project,
): void {
    Span::add('projectId', $project->getId());
    Span::add('type', $payload['type']);
    // ...actual work...
}
`)}

<h2>Why not just make the logger methods static?</h2>
<p>Because Appwrite's codebase leverages coroutines (via Swoole) for concurrency between requests, similar to goroutines in Go. A naive static implementation would leak state across concurrent requests. Span solves this by allowing you to choose the storage type:</p>
${code(String.raw`
Span::setStorage(new Storage\Coroutine());
`)}

<h2>Exporters</h2>
<p>To combine both logger and console capabilities, Span exposes built-in Exporters, which, as the name suggests, export the logs to not just stdout but any supported adapter. The library currently supports three:</p>
<p><strong>Stdout</strong>: basic usage. Dumps the output as plain JSON:</p>
${code(String.raw`
{
  "action": "worker.deletes",
  "span.trace_id": "7a3f9c2b4e1d8f06",
  "span.duration": 1.92,
  "project.id": "67f3a9",
  "project.type": "projects",
  "project.region": "fra"
}
`)}
<p><strong>Pretty</strong>: JSON dumps are very useful in production where you have OpenTelemetry or other monitoring set up, but locally you just want things to be readable:</p>
${code(String.raw`
worker.deletes · 1.92s · 7a3f9c2b

  project.id      67f3a9
  project.type    projects
  project.region  fra

  ────────────────────────────────
`)}
<p><strong>Sentry</strong>: since Sentry is primarily an error tracking system, Span also exposes a callable "sampler" that lets you filter which logs get exported to a particular exporter:</p>
${code(String.raw`
Span::addExporter(
    new Sentry(dsn: '...'),
    // Sampler: drop noisy expected errors, keep everything else.
    sampler: function (Span $span): bool {
        $error = $span->getError();
        return !($error instanceof ExecutorException) || $error->isPublishable();
    },
);
`)}

<h2>Before and after</h2>
<p>One massive improvement we saw was with error logs. Before, we had very verbose and noisy errors that were often hard to make sense of:</p>
${code(String.raw`
[Error] Timestamp: 2026-04-17T10:32:16+00:00
[Error] Type: Utopia\Database\Exception\Timeout
[Error] Message: Query took too long
[Error] File: /usr/src/code/src/Appwrite/Cloud/Platform/Workers/Deletes.php
[Error] Line: 214
Trace: #0 /usr/src/code/app/worker.php(828): ...
`)}
<p>Now:</p>
${code(String.raw`
{
  "action": "worker.deletes",
  "span.trace_id": "7a3f9c2b4e1d8f06",
  "span.duration": 2.14,
  "project.id": "67f3a9",
  "error.type": "Utopia\\Database\\Exception\\Timeout",
  "error.message": "Query took too long",
  "error.file": "/usr/src/code/src/Appwrite/Cloud/Platform/Workers/Deletes.php",
  "error.line": 214,
  "error.trace": [
    {
      "file": "/usr/src/code/app/worker.php",
      "line": 828,
      "function": "action"
    }
  ]
}
`)}
<p>If you're writing PHP in 2026, give <a href="https://github.com/utopia-php/span">utopia-php/span</a> a shot. And a massive shoutout to <a href="https://twitter.com/lukebsilver">@lukebsilver</a>, who actually built the library. I just learned from him and wanted to share what I picked up.</p>
<p><a href="blog.html">← All writing</a></p>`,
};
