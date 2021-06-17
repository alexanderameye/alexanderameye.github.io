--- 
title: Holographic Card Shader
description: How I created a holographic Pokémon card shader.
icon: 🃏
date: 2020-02-12
tags: 
    - graphics
    - unity
marker: yellow
redirect_from: [/parallax-card, /parallax-card.html]
--- 

## Introduction

A short breakdown of how I made a <mark>holographic card shader</mark>. The goal was to do as much as possible in the shader itself without relying on any textures. I ended up using a single 3D model for the Pokémon and a single texture for the text. The design of the card was inspired by [Rob Fichman][rob-fichman]'s work. The 3D model of the Cosmog Pokémon was created by [AlmondFeather][almondfeather] on Sketchfab.

<video width="50%" title="Cosmog parallax Pokémon card." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="holographic-card-shader.mp4" type="video/mp4">
<source src="holographic-card-shader.webm" type="video/webm">
</video>

## Card Frame

The frame of the card consists of the outer edge, the horizontal divider at the bottom, the 'window' through where you see the Pokémon and the title bar below the window. 

All of these elements are drawn using simple <mark>rectangle and polygon shapes</mark>. I have full control over their dimensions which allows me to quickly change the structure and layout of the card. Here are some of the properties that I use to control the frame of the card.

{% noteimage "./notes/holographic-card-shader/properties.png", "Shader properties.", "(min-width: 30em) 50vw, 100vw", page.url %}

In total, the shader has <mark>65 exposed properties</mark>. This is quite a lot, but I like that I can tweak variables as much as I want until I'm happy with the result. 

## Icons
The card features several icons like the ones used for indicating the type of the Pokémon. Additionally there are some decorational celestial bodies on the right bottom corner of the card. All of these are a made up of basic <mark>signed distance functions</mark>. 

{% noteimage "./notes/holographic-card-shader/pokemon-types.png", "Pokémon types.", "(min-width: 30em) 50vw, 100vw", page.url %}

For the decorational corner pattern, the stars are made out of 2 vesica SDFs blended together. The moon is made out of 2 spheres and the planet is made out of several spheres and ellipses. All of the icons exist on the same plane, but I added a <mark>parallax effect</mark> to fake depth between the icons. 

<video width="50%" title="Parallax effect." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="corner-pattern.mp4" type="video/mp4">
<source src="corner-pattern.webm" type="video/webm">
</video>

For practice, I recreated several of the pokemon-typ icons. It was very enjoyable to try and figure out what base shapes I could combine to end up with the right icon. If you want more information about drawing 2D SDFs you can check out this page from [Inigo Quilez][2d-sdf].

## Raymarched Spheres
There are little spheres in the card that I use for showing the pokemon types and the attacks. These are <mark>raymarched spheres</mark>. Together with some <mark>Blinn-Phong</mark> lighting they look 3D and I can fake having 3D objects in the shader without having any actual 3D geometry. 

<video width="50%" title="Raymarched spheres." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="raymarched-spheres.mp4" type="video/mp4">
<source src="raymarched-spheres.webm" type="video/webm">
</video>

## Text
At first, I attempted to do the text in-shader as well. This is possible for sure, using <mark>bezier curves and SDFs</mark> and I actually got quite close to rendering letters how I wanted to.

{% noteimage "./notes/holographic-card-shader/text.png", "Text generation in shader.", "(min-width: 30em) 50vw, 100vw", page.url %}

However in the end, it was quite a lot of work to render text with the exact font that I wanted, so I decided to just us a simple texture.

## Holographic Sparkles
For the sparkles I created some patterns using <mark>voronoi functions</mark>. Then, by converting the colors to directions and taking the dot product of this direction and the view direction, I could make different sparkles show up under different viewing angles.

{% noteimage "./notes/holographic-card-shader/voronoi2.png", "Voronoi pattern.", "(min-width: 30em) 50vw, 100vw", page.url %}

Multiple voronoi patterns were overlayed on top of eachother to generate a more interesting pattern.

## Parallax Effect
The whole card is flat, but by using raymarched spheres and parallax effects, I managed to create a nice 3D effect. A parallax effect can be achieved by <mark>offsetting the UVs based on the view direction</mark>.

{% noteimage "./notes/holographic-card-shader/parallax-offset.png", "Parallax offset.", "(min-width: 30em) 50vw, 100vw", page.url %}

Using parallax is great way to achieve some sense of depth in an otherwise flat card.

<video width="50%" title="Using parallax to achieve a sense of depth." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="parallax-effects.mp4" type="video/mp4">
<source src="parallax-effects.webm" type="video/webm">
</video>

## Stencil Shader
A stencil shader was used to make it so that the 3D scene is only visible through the window of the card itself. [Cyanilux][stencil-explanation] has created a post that explains setting up stencils in URP.

<video width="50%" title="Stencil mask." loop="" autoplay="" playsinline="" muted="true" class="note-video">
<source src="stencil.mp4" type="video/mp4">
<source src="stencils.webm" type="video/webm">
</video>

[rob-fichman]: https://twitter.com/bobacupcake
[almondfeather]: https://sketchfab.com/3d-models/cosmog-d928b7339a9b4ecb841162c53b4c4f4a
[2d-sdf]: https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
[stencil-explanation]: https://twitter.com/Cyanilux/status/1193513267534151680?s=20