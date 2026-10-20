---
title: "MOSS Image Basic Workflow"
date: 2026-10-19
draft: false
tags: ["ComfyUI", "MOSS-Image", "AI"]
description: "MOSS Image Basic Workflow"
---

## MOSS-Image Official Links
* https://github.com/OpenMOSS/MOSS-Image
* https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT

## Instructions

1. MOSS-image was recently added to ComfyUI, if some of the nodes from the workflow are missing you'll need to update to the latest version of ComfyUI.
1. Download the model files linked below and copy them to the locations shown.
1. Download the [workflow](moss-t2i.json) and drag it into ComfyUI.
1. Update the Positive Prompt node with your prompt, for best results use the optional prompt enhancer linked below.
1. Click the Run button, your image will be generated.
1. If you have any problems then leave a comment on the YouTube video and I can help you out.

## Workflow

* <a href="moss-t2i.json" download="moss-t2i.json">moss-t2i.json</a>

## Models

<p style="margin-bottom: 4px;">Download these files:</p>

* [moss_image_sft_int8_convrot.safetensors](https://huggingface.co/Comfy-Org/MOSS-Image/resolve/main/diffusion_models/moss_image_sft_int8_convrot.safetensors)
* [moss_image_sft_bf16.safetensors](https://huggingface.co/Comfy-Org/MOSS-Image/resolve/main/diffusion_models/moss_image_sft_bf16.safetensors)
* [qwen3.5_9b_w4a8_gptq.safetensors](https://huggingface.co/Comfy-Org/MOSS-Image/resolve/main/text_encoders/qwen3.5_9b_w4a8_gptq.safetensors)
* [flux2-vae_small.safetensors](https://huggingface.co/Comfy-Org/MOSS-Image/resolve/main/vae/flux2-vae_small.safetensors)


<p style="margin-bottom: -20px; margin-top: 20px">Place them in these folders:</p>

```
📂 ComfyUI/
├── 📂 models/
│   ├── 📂 diffusion_models/
│   │   ├── moss_image_sft_int8_convrot.safetensors
│   │   └── moss_image_sft_bf16.safetensors
│   ├── 📂 text_encoders/
│   │   └── qwen3.5_9b_w4a8_gptq.safetensors
│   └── 📂 vae/
│       └── flux2-vae_small.safetensors
```

## Prompt Enhancement (optional)

To enhance your prompt, paste the following prompt into your favorite LLM. On the very last line, replace "[PUT YOUR IMAGE IDEA HERE]" with your idea.

If you use a coding tool with agent support you can use the official agent skill from [here](https://github.com/OpenMOSS/MOSS-Image/tree/main/skills/moss-image-prompt-enhancer).

```
You turn a user's image idea into one detailed caption for a text-to-image model. The model learned from captions that describe finished images, so write the caption as a description of the image itself, not as instructions.

Keep the request
- Keep everything the user specified: subjects, counts, actions, relationships, medium, style, mood, colors and anything they excluded. Never contradict or drop it.
- Fill in what they left open with concrete visual choices: setting, composition and framing, viewpoint, lighting, materials and textures, color palette, and the artistic medium.
- Describe only what can be seen. Leave out sounds, smells, backstory and intentions.
- Do not invent real-world facts the user did not give, such as specific dates, prices, names or specifications.

Text in the image
- Quote every piece of visible text exactly, in double quotes. Keep the user's wording, language, spelling, capitalization, punctuation and line breaks; never translate it.
- If the user asks for a designed image (poster, cover, menu, label, sign, infographic) without giving its text, write short, specific copy that fits instead of placeholders.
- Describe where each text sits and how it looks: position, reading order, alignment, line breaks, relative size, font style, color and spacing.
- Do not mention watermarks or artist signatures.

Writing
- Write in English, in plain prose: one to three paragraphs, usually 80 to 200 words, longer only when there is a lot of text to place.
- Open with the medium and the main subject, then the setting and composition, then lighting, colors and finer details.
- Give positions with words such as left, right, top, bottom, foreground and background. No coordinates, lists, headings, JSON or Markdown.
- No quality keywords such as "masterpiece", "best quality", "8k" or "highly detailed", and no negative prompt.

Reply with the caption only: no title, introduction, explanation or surrounding quotes.

USER IMAGE IDEA:
[PUT YOUR IMAGE IDEA HERE]
```
