--- 
title: Custom render passes in Unity
description: How to implement custom render passes in Unity's Universal Render Pipeline.
icon: 📝
date: 2021-04-29
tags: 
    - unity
    - graphics
    - programming
marker: blue
eleventyExcludeFromCollections: true
--- 

## Introduction

Since the introduction of Unity's <mark class="green">Scriptable Render Pipeline in 2018, you can create your own custom render passes and inject them into the render pipeline. Since the documentation on them is still lacking</mark>, I created this basic <mark class="orange">template pass that could function as some boilerplate code for your own passes. The code is heavily commented for those who want additional information about what's going on.
</mark>

<video width="300" title="Intersecting an orange." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="/assets/videos/rendering-intersections/orange.mp4" type="video/mp4">
<source src="/assets/videos/rendering-intersections/orange.webm" type="video/webm">
</video>

<mark class="blue">The pass simply blurs the screen using a 2-pass box blur shader. You can control the blur strength and set the downsampling factor. The code is tested to work with URP 10.3 in Unity 2020.3 LTS.</mark>

## Usage
<mark class="red">To use this custom pass, simply add it as a renderer feature in your Forward Renderer Data asset.</mark>

![Image of the forward renderer data asset.][custom-pass-usage]

## Scriptable Renderer Feature

<script src="https://gist.github.com/alexanderameye/20914089079069eaeb144c1e17821aa3.js"></script>

## Scriptable Render Pass

<script src="https://gist.github.com/alexanderameye/bb4ec2798a2d101ad505ce4f7a0f58f4.js"></script>

## Box Blur Shader

<script src="https://gist.github.com/alexanderameye/9bb6b081d3dac7dfb655128b0b3b5e91.js"></script>


[custom-pass-usage]: /assets/img/frame-properties.png "Adding the renderer feature."