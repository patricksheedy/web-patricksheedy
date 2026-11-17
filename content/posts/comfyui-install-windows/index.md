---
title: "ComfyUI Windows Install Script"
date: 2026-11-16
draft: false
tags: ["ComfyUI", "Script", "AI", "Windows"]
description: "Automatically install and uninstall ComfyUI on Windows with a single script."
---

This is a guide to installing ComfyUI on Windows. The scripts automate the whole
process. These are some existing pain points and how the script solves them:

* Installing is tedious - Only a single script that installs everything.
* Upgrading is risky - Parallel installs so you don't break working installations.
* Migrating files is a hassle - Files are shared so no migration needed.
* Models take too much space - Files are shared so no migration needed.

## Requirements

* Install Git and Miniconda by running this command in a terminal:
  ```
  winget install Git.Git Anaconda.Miniconda3 --accept-package-agreements --accept-source-agreements
  ```
* Open the Start menu, search for "Anaconda Prompt", and run it.
* In the Anaconda Prompt that appears, type:
  ```
  conda init
  ```

## Installing ComfyUI

* Open a command prompt and `cd` to the directory where you want to install ComfyUI.
* Clone the scripts repository:
   ```
   git clone https://github.com/patricksheedy/comfyui-scripts scripts
   ```
* Run the install script:
   ```
   scripts\install-comfy.cmd
   ```

The script creates a date-timestamped install directory and conda environment, installs ComfyUI into it, and
installs your custom nodes.

## Command-line options

* `--name <NAME>` — Use a custom name for the install rather than the default date-timestamp.
* `--customnodes <PATH>` — Path to a `.txt` file listing custom nodes (default: `customnodes.txt` next to the script).
* `--skip-custom-nodes` — Skip custom node installation entirely.
* `--help` — Show the usage help and exit.

## Uninstalling ComfyUI

* Remove a named install by passing its directory name:

  ```
  scripts\uninstall-comfy.cmd comfy-2026.11.06-1310
  ```

* Run it with no arguments and it works interactively: it lists your installs and removes them, keeping the most
  recently created one so you always have a working copy.

## Source

You can find the full script source on GitHub: https://github.com/patricksheedy/comfyui-scripts

If you run into any problems leave a comment on the YouTube video and I can help get you going.

## YouTube Video

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/wLhHFQyQyzg"
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>