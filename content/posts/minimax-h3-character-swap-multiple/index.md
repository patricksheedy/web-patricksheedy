---
title: "Minimax H3 Character Swap Multiple Characters"
date: 2026-11-20
draft: false
tags: ["ComfyUI", "MiniMax", "AI"]
description: "MiniMax H3 Character Swap Multiple Characters"
---

In this guide, you will learn how to replace multiple characters in the same video using MiniMax H3 and ComfyUI. This is an extension of the single character swap workflow: SAM 3 tracks up to four people in the source clip, each tracked subject gets its own color-tinted mask (red, green, blue, and yellow), and the model swaps in a different reference character for each masked region—all while preserving the scene, camera motion, and lighting.

## Links

### Models
* [minimax_h3_ref2va_pruned_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/diffusion_models/minimax_h3_ref2va_pruned_int8_convrot.safetensors)
* [qwen3vl_32b_minimax_h3_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_int8_convrot.safetensors)
* [minimax_h3_sol_vae_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_sol_vae_int8_convrot.safetensors)
* [minimax_h3_audio_vae_fp32.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors)
* [sam3.1_multiplex_fp16.safetensors](https://huggingface.co/Comfy-Org/sam3.1/resolve/main/checkpoints/sam3.1_multiplex_fp16.safetensors)
* [pika_h3_flex_ref2va_v1_bf16.safetensors](https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/loras/pika_h3_flex_ref2va_v1_bf16.safetensors)

### Workflow
* <a href="minimax-char-swap-multi.json" download="minimax-char-swap-multi.json">minimax-char-swap-multi.json</a>

### Example images and video (optional)
* https://drive.google.com/file/d/120uTbqFvOhKlsvrOzKIeYDrbKwH8SkEL/view?usp=sharing

## File Locations

Copy the downloaded files into your ComfyUI directory as shown below. Create the directories if they don't exist.

```
ComfyUI/
├── 📂 models/
│   ├── 📂 diffusion_models/
│   │   └── minimax_h3_ref2va_pruned_int8_convrot.safetensors
│   ├── 📂 text_encoders/
│   │   └── qwen3vl_32b_minimax_h3_int8_convrot.safetensors
│   ├── 📂 vae/
│   │   ├── minimax_h3_sol_vae_int8_convrot.safetensors
│   │   └── minimax_h3_audio_vae_fp32.safetensors
│   ├── 📂 checkpoints/
│   │   └── sam3.1_multiplex_fp16.safetensors
│   └── 📂 loras/
│       └── pika_h3_flex_ref2va_v1_bf16.safetensors
```

## How It Works

Instead of a single black silhouette mask, this workflow creates four separate masks—one per tracked person—and combines them into a single color-coded mask video. Each character image is loaded into its own reference slot, and the prompt tells the model which character goes into which colored mask:

- Person 1 → red mask → <Picture 1>
- Person 2 → green mask → <Picture 2>
- Person 3 → blue mask → <Picture 3>
- Person 4 → yellow mask → <Picture 4>

The SAM3 Track to Mask node has an object_indices setting for each person (0, 1, 2, 3), so you can control which tracked person maps to which character image. The Save Mask Preview node outputs the combined mask video so you can verify the tracking before running the full generation.

## Instructions

- Install or update VideoHelperSuite node.
  - The node should have a format property set to H3. If it doesn't then get the latest version from [github](https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite/).
- Download all the models above and put them in the specified directories.
- Drop the workflow into ComfyUI.
- Drop your character images into the Load Image nodes (Load Image 1 to 4)
- Drop your video into Load Video Node
- Click the Run button

If you only want to swap some of the tracked people, use the object_indices setting on each SAM3 Track to Mask node to pick which ones to use, and remove the unused subjects from the prompt.
