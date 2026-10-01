---
layout: "app"
title: "Timecode to Frame Number"
date: 2026-10-01
draft: false
tags: ["Calculator", "Video", "Utilities"]
description: "Convert video timecodes to frame numbers at 24 FPS for ComfyUI."
---

<main class="min-vh-100 d-flex align-items-center justify-content-center">
  <div class="tc-card card shadow-lg border-0">
    <div class="card-body p-4">
      <h1 class="h4 mb-3 text-center">Video Helper Suite Frame Calculator</h1>
      <br />
      <h2 class="tc-section-title">Source Video Timecode</h2>
      <input id="tc" type="text" class="form-control" autofocus autocomplete="off">
      <h2 class="tc-section-title mt-3">Duration (seconds)</h2>
      <input id="secs" type="text" class="form-control" value="5" autocomplete="off">
      <br />
      <hr />
      <h2 class="tc-section-title mt-3">Skip First Frames</h2>
      <div class="d-flex align-items-center gap-2">
        <div class="tc-result" id="out">&nbsp;</div>
        <button type="button" class="btn btn-sm btn-outline-light" id="copy-frame">Copy</button>
      </div>
      <h2 class="tc-section-title mt-3">Frame Load Cap</h2>
      <div class="d-flex align-items-center gap-2">
        <div class="tc-result" id="out-duration">&nbsp;</div>
        <button type="button" class="btn btn-sm btn-outline-light" id="copy-duration">Copy</button>
      </div>
    </div>
  </div>
</main>
