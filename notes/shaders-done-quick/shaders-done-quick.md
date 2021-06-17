--- 
title: Shader tutorials in 60 seconds
description: Short and sweet shader tutorials.
icon: ⏳
date: 2020-04-06
tags: 
    - graphics
    - unity
    - gamedev
marker: yellow
redirect_from: [/simple-water, /simple-water.html, /simple-toon, /simple-toon.html, /pixelation, /pixelation.html]
--- 

## Introduction
In the first few months of 2020 I created three <mark>60-second shader tutorials</mark>. These tutorials were meant to be quick, to-the-point and dense in information.

## Stylized Water Shader
A simple but effective water shader that creates an interesting stylized look. The shader uses the <mark>depth buffer</mark> for coloring and generating foam. Refraction is added by distorting the used UVs.

<video width="70%" title="Stylized water shader." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="stylized-water-shader-tutorial.mp4" type="video/mp4">
<source src="stylized-water-shader-tutorial.webm" type="video/webm">
</video>

The model of the castle was created by [mStuff][mStuff] on Sketchfab.

## Toon Shading
A basic toon shader with a color gradient and hard specular lighting. A <mark>Blinn-Phong</mark> lighting model is used for the specular shading.

<video width="70%" title="Toon shading." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="toon-shading-tutorial.mp4" type="video/mp4">
<source src="toon-shading-tutorial.webm" type="video/webm">
</video>

The model of the Shiba Inu was created by [Ida Fabere][Ida Fabere] on Sketchfab.

## Retro Effect
A retro pixelation effect that also includes some scanlines. A low resolution render texture is used for the pixelation and a <mark>full-screen shader</mark> is used for the post-processing effects.

<video width="70%" title="Retro effect." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="retro-effect-tutorial.mp4" type="video/mp4">
<source src="retro-effect-tutorial.webm" type="video/webm">
</video>

The model of the subway was created by [Luc Miramont][Luc Miramont] on Sketchfab.

## Sources
All 3 shaders can be downloaded below as Unity packages.

{% download 'stylized-water' '/downloads/packages/shaders-done-quick/stylized-water.unitypackage' %}

{% download 'toon-shading' '/downloads/packages/shaders-done-quick/toon-shading.unitypackage' %}

{% download 'retro-effect' '/downloads/packages/shaders-done-quick/retro-effect.unitypackage' %}

[mStuff]: https://sketchfab.com/3d-models/peach-castle-a21cffbe8b8c4ae9b1614f26f2da8fed
[Ida Fabere]: https://sketchfab.com/Ida..Faber
[Luc Miramont]: https://sketchfab.com/3d-models/metro-b93d2dac53e24d8fb4fad4b3c577c54d