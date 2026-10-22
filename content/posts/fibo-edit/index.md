---
title: "Fibo 2.0 Edit Workflow"
date: 2026-10-21
draft: false
tags: ["ComfyUI", "Fibo", "AI"]
description: "Fibo 2.0 Edit Workflow"
---

## Fibo 2.0 Links
* https://huggingface.co/briaai/Fibo-2.0-edit-turbo
* https://huggingface.co/Comfy-Org/Fibo-2.0

## Instructions

1. Fibo 2.0 was recently added to ComfyUI, you need to update to the latest version of ComfyUI.
1. Download the model files linked below and copy them to the locations shown.
1. Download the [fibo2-edit-turbo.json](fibo2-edit-turbo.json) workflow and drag it into ComfyUI.
1. Edit Mode: Drag your source image into the Load Image node.
1. Text To Image Mode: Right click the Load Image node and select Bypass option.
1. Update the prompt, then click the Run button, your image will be generated.
1. If you have any problems then leave a comment on the YouTube video and I can help you out.

## Workflow

* <a href="fibo2-edit-turbo.json" download="fibo2-edit-turbo.json">fibo2-edit-turbo.json</a>

## Models

<p style="margin-bottom: 4px;">Download these files:</p>

* [fibo2_dev_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/Fibo-2.0/resolve/main/diffusion_models/fibo2_dev_int8_convrot.safetensors)
* [qwen3vl_4b_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/Fibo-2.0/resolve/main/text_encoders/qwen3vl_4b_int8_convrot.safetensors)
* [flux2-vae.safetensors](https://huggingface.co/Comfy-Org/Fibo-2.0/resolve/main/vae/flux2-vae.safetensors)


<p style="margin-bottom: -20px; margin-top: 20px">Place them in these folders:</p>

```
📂 ComfyUI/
├── 📂 models/
│   ├── 📂 diffusion_models/
│   │   └── fibo2_dev_int8_convrot.safetensors
│   ├── 📂 text_encoders/
│   │   └── qwen3vl_4b_int8_convrot.safetensors
│   └── 📂 vae/
│       └── flux2-vae.safetensors
```

<!--
## YouTube Video

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/K5zD_af-Tag" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>
-->