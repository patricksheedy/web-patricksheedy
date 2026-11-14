---
title: "MiniMax H3 Image Text-to-Image Workflow"
date: 2026-11-10
draft: false
tags: ["ComfyUI", "MiniMax", "AI"]
description: "MiniMax H3 Image Text-to-Image Workflow"
---

MiniMax H3 Image is a high-resolution image generation model that works best between 4 MP and 20 MP. In this guide you'll learn how to generate images from text in ComfyUI using the official MiniMax H3 Image workflow.

## MiniMax H3 Image Official Page
* https://huggingface.co/MiniMaxAI/MiniMax-H3-Image

## Instructions

1. Update to the latest version of ComfyUI.
1. Download the model files linked below and copy them to the locations shown.
1. Download the [workflow](minimax-h3-image-t2i.json) and drag it into ComfyUI.
1. Update the prompt text.
1. Click the Run button, your image will be generated.
1. If you have any problems then leave a comment on the YouTube video and I can help you out.

## Workflow

* <a href="minimax-h3-image-t2i.json" download="minimax-h3-image-t2i.json">minimax-h3-image-t2i.json</a>

## Models

<p style="margin-bottom: 4px;">Download these files:</p>

* [minimax_h3_image_pruned_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3-Image/resolve/main/diffusion_models/minimax_h3_image_pruned_int8_convrot.safetensors) (21 GB)
* [qwen3vl_32b_minimax_h3_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_int8_convrot.safetensors) (25.28 GB)
* [minimax_h3_image_vae_fp16.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3-Image/resolve/main/vae/minimax_h3_image_vae_fp16.safetensors) (1.17 GB)

<p style="margin-bottom: -20px; margin-top: 20px">Place them in these folders:</p>

```
📂 ComfyUI/
├── 📂 models/
│   ├── 📂 diffusion_models/
│   │   └── minimax_h3_image_pruned_int8_convrot.safetensors
│   ├── 📂 text_encoders/
│   │   └── qwen3vl_32b_minimax_h3_int8_convrot.safetensors
│   └── 📂 vae/
│       └── minimax_h3_image_vae_fp16.safetensors
```

## Prompt Expansion Guide

* Official prompt guide: https://github.com/MiniMax-AI/MiniMax-H3-Image/blob/main/skills/h3-image-prompt-writing/references/t2i-en.txt


## YouTube Video

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/LWBqxJdVgaw?si=eA_f2ednKiuhBDsP"
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen>
</iframe>

