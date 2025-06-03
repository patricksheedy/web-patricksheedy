---
title: "MCP Simple Setup With DeepChat"
date: 2025-06-03
draft: false
tags: ["MCP", "DeepChat", "AI"]
description: "The easiest way to get started with MCP"
---

It took me a while of searching to get a grasp of what MCP can do. I created this tutorial to help others who are just getting started.
This isn't the only way to setup MCP, it is just the easiest way that I found to do it.

If you have problems getting this to run, then [leave a comment on my YouTube video](https://www.youtube.com/watch?v=oQxheXlXi2Y)
and I'll try to help you out.

## Setup

* Open a cmd prompt and run `winget install ThinkInAIXYZ.DeepChat`.
* Go to openrouter.ai
  * Create an account if you don't already have one.
  * Click your profile icon, click Keys, create a new key, save they key for later.
  * Optional: Add $10 or more of credit, you'll get more free requests even if you never use your credits.
* Start DeepChat from the desktop icon.
* In the dialogs that appear, select OpenRouter and add your key.
* Go to [Microsoft's Playwright GitHub](https://github.com/microsoft/playwright-mcp).
* Scroll down to the Getting Started section and copy the json.
* Click Settings icon at the top of DeepChat.
* Go to the MCP Settings, click the Add button at the bottom.
* Paste in the json settings from Playwright.
* Go back to the chat and your AI prompts can now access web pages.

## Watch the video
<iframe width="560" height="315" src="https://www.youtube.com/embed/oQxheXlXi2Y?si=JcyqT3XO_QLuAZNV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
