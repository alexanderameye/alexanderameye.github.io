--- 
title: Lighting Models
description: An introduction to lighting models like diffuse, specular and subsurface scattering and how to implement them.
icon: 💡
date: 2021-05-28
tags: 
    - note
    - graphics
    - math
marker: yellow
eleventyExcludeFromCollections: true
--- 

## Introduction
In this post I will be describing several lighting models. Specifically I'll be talking aboutthe 3 most commonly used lighting models: <mark>diffuse</mark>, <mark>ambient</mark> and <mark>specular</mark> lighting.

## Diffuse Lighting
### Physical Model
When light falls on a perfectly diffuse material, the light is scattered equally in all directions. At a microscopic level, the surface of the material is rough and so it scatters the light equally in all directions around the object. The properties of a diffuse material can be summarised in these 3 statements.

- Incoming light is scattered equally in all directions
- Reflected intensity is independent of viewing direction
- Reflected intensity is dependent on light direction

A diffuse material is also called <mark>Lambertian</mark> since it follows Lambert's cosine law. The cosine law goes like this:

> The radiant intensity observed from an ideal diffuse material is directly proportional to the cosine of the angle theta between the direction of the incident light and the surface normal.

In other words, the reflected light intensity depends on the angle between the light and the surface normal.

### Formula
The cosine law can be written in a formula like this:

$$L_{reflected} \sim cos(\theta)$$

The dot product between the surface normal vector $N$ and the light direction $L$ can be written as follows if those vectors are normalized:

$$\begin{aligned}
&N.L = \Vert{N}\Vert\Vert{L}\Vert\cos(\theta) \\
&N.L = \cos(\theta)
\end{aligned}$$

And so $L_{reflected}$ is directly proportional to the dot product between the light vector and the surface normal vector.

$$\begin{aligned}
&L_{reflected} \sim N.L \\
&L_{reflected} \sim dot(N,L)
\end{aligned}$$

The most important thing is that the radiant intensity $L_{reflected}$ is dependent on the dot product between $N$ and $L$. Additionally, the radiant intensity could be further modulated by the surface reflectivity $K_d$, the incoming light intensity $L_{incoming}$, the surface color $C_{surface}$ and the light color $C_{light}$.

$$L_{reflected} = C_{surface}C_{light}K_dL_{incoming}(N.L)$$

One important thing to note is that the $cos(\theta)$ term can be negative and so should be clamped before being used.

## Ambient Lighting
### Physical model
Sometimes, an ambient term is added to <mark>fake</mark> indirect diffuse illumination. The ambient term has no physical meaning but it is just used to give all pixels a minimum intensity.

### Formula
The ambient term can simply be added to the existing diffuse term with $L_d$ being the diffuse lighting term, $K_a$ being the ambient surface reflectivity and $L_{ambient}$ being the ambient light intensity.

$$L_{reflected} = L_d + C_{surface}C_{light}K_aL_{incoming}L_{ambient}$$

Again, the lighting term can be modulated by a term for the surface color and light color.

## Specular Lighting
Specular lighting models are used to model shiny/glossy highlights/specularities. This highlight shifts depending on the view direction and unlike diffuse lighting which scatters light in all directions, a specular material scatters light in a lobe of 'preferred' directions. The reflected light is the strongest when looking through the direction or $R$ which is the reflected light vector $L$. 

### Phong
The first model is the Phong model. There is a falloff around this 'ideal' direction modeled by $\cos(\alpha)^{e}$ with $\alpha$ being the angle between the view direction $V$ and the reflected light direction $R$.

This results in the following formula where $K_s$ is the specular reflection coefficient.

$$L_{reflected} = K_s\cos(\alpha)^{e}$$

Same as for diffuse lighting where a $\cos$ term was used, this term needs to be clamped between 0 and 1 since it can be negative. The parameter $e$ is the falloff control which controls have steep the lobe of reflected directions is. Same as for diffuse lighting, the $\cos$ term can be replaced by the dot product of $R$ and $V$ if those vectors are normalized.


### Blinn-Phong

## Subsurface Scattering


## Absorption


## Refraction


## Transmission


https://seblagarde.wordpress.com/2012/01/08/pi-or-not-to-pi-in-game-lighting-equation/
https://www.robots.ox.ac.uk/~att/index.html#:~:text=Phong%20gave%20spectral%20reflectivity%20as,generally%20accepted%20phong%20lighting%20equation
https://www.youtube.com/watch?v=uXO9mPHyj_Q&ab_channel=TheGamedevGuru