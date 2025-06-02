---
title: "Hyperlora ComfyUI Installation"
date: 2025-05-30
draft: false
tags: ["ComfyUI", "Hyperlora", "AI"]
description: "Simple Hyperlora faceswap in ComfyUI"
---

This is a simple guide to setting up Hyperlora in ComfyUI. I've found that Hyperlora is the easiest way to do
a faceswap with just a single reference image.

This guide works on my system. I haven't tried it anywhere else so I'd like to know about any issues that you run into.
If you have problems getting it to run, [leave a comment on my YouTube video](https://www.youtube.com/watch?v=0g6F2ZHG6N4) describing your problem and I'll help you out.

## Setup

This guide is based off of the source [Hyperlora](https://github.com/bytedance/ComfyUI-HyperLoRA) page.

* `cd` to your ComfyUI models directory.
* Create a directory called `hyper_lora` and `cd` into it.
* Download the Hyperlora model files, use one method below, Windows method is a simple copy and paste.
  * Windows (simple method)
    * Run this command in a cmd terminal: `winget install bodaay.hfdownloader`. This installs a HuggingFace downloader.
    * Run this command in a cmd terminal: `hfdownloader -m bytedance-research/HyperLoRA hyper_lora`
  * Manual method
    * Create a directory called `hyper_lora`
    * Download `sdxl_hyper_id_lora_v1_edit` and `sdxl_hyper_id_lora_v1_fidelity` folders and all their files to the `hyper_lora` directory.
* Copy `preprocessor_config.json`, `config.json`, and `model.safetensors` to the respective directories. These are the first three files shown in the tree below. Create the directories as shown in the tree view.

```
C:.
└───hyper_lora
    ├───clip_processor
    │   └───clip_vit_large_14_processor
    │           preprocessor_config.json -> https://huggingface.co/openai/clip-vit-large-patch14/raw/main/preprocessor_config.json
    │
    ├───clip_vit
    │   └───clip_vit_large_14
    │           config.json -> https://huggingface.co/openai/clip-vit-large-patch14/raw/main/config.json
    │           model.safetensors -> https://huggingface.co/openai/clip-vit-large-patch14/resolve/main/model.safetensors
    │
    └───hyper_lora
        │   .gitattributes (not needed, but will show up if you download the entire repo)
        │   README.md      (not needed, but will show up if you download the entire repo)
        │
        ├───assets
        │       overview.jpg (not needed, but will show up if you download the entire repo)
        │
        ├───sdxl_hyper_id_lora_v1_edit
        │       hyper_lora_modules.json
        │       hyper_lora_modules.safetensors
        │       id_projector.safetensors
        │       resampler.safetensors
        │
        └───sdxl_hyper_id_lora_v1_fidelity
                hyper_lora_modules.json
                hyper_lora_modules.safetensors
                id_projector.safetensors
                resampler.safetensors
```

* Verify that everything is in your `hyper_lora` matches what is shown above. On Windows you can use `tree /f` to generate a tree view for comparison.
* Install the Antelopev2 model
  * [Download the zip file](https://drive.google.com/file/d/18wEUfMNohBJ4K3Ly5wpTejPfDzp-8fI8/view?usp=sharing)
    * This link was obtained [here](https://github.com/deepinsight/insightface/tree/master/python-package#model-zoo).
  * Extract the files from the zip file and place them as shown in the tree below. The `insightface` directory is a directory in your main ComfyUI `models` directory. Create it if necessary.

```
models\insightface
        └───models
            └───antelopev2
                    1k3d68.onnx
                    2d106det.onnx
                    genderage.onnx
                    glintr100.onnx
                    scrfd_10g_bnkps.onnx
```

* Download the workflows to a temp directory
  * `git clone https://github.com/bytedance/ComfyUI-HyperLoRA/`
  * If you are on Windows and don't already have `git`
    * Run this command in a cmd window first `winget install Microsoft.Git`
* Download the RealVisXL model (optional)
  * The Hyperlora devs tested on this model so it is the most likely to work. You can experiment with other SDXL models.
    * Download the [v4.0 (BakedVAE) model](https://civitai.com/models/139562?modelVersionId=344487) and place it in your `models\checkpoints` folder.
* Start ComfyUI
* Go to the temp directory from above and `cd` to `assets`
* Drag the `HyperLoRA-T2I-FaceDetailer.json` file into ComfyUI.
* Go to the ComfyUI Manager, click 'Install Missing Custom Nodes', download everything shown.
* Restart and reboot the server when prompted.
* Drag the `id-02.png` file into the `Load Image` node in the ComfyUI workflow.
* Click the `Run` button. You'll probably get an error in the `Load Checkpoint` node. Change the node to select the RealVisXL model that you downloaded.
* Click `Run` again. It should run successfully.
* Compare your result to the result on [this page](https://github.com/bytedance/ComfyUI-HyperLoRA?tab=readme-ov-file). It should be very similar.
* That's it, if you have any issues then leave a comment on the YouTube video and I can help you get going.

## Watch the video
<iframe width="560" height="315" src="https://www.youtube.com/embed/i_wlkVGiVy0?si=de3Iwm_xv1Cup_TY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
