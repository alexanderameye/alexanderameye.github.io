<!DOCTYPE html>
<html lang="en">

<head>
  <!-- SITE INFO -->
  <title>Hand Drawn Lines</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="favicon.ico?">

  <!-- ANALYTICS -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137365487-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-137365487-1');
  </script>

  <!-- FONTS -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Inconsolata&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link href="../../css/style.css" rel="stylesheet">
  <link rel="stylesheet" href="../../css/bootstrap/bootstrap.css">
</head>

<body>
  <div class="container">
    <br><br>
    <ol class="breadcrumb">
      <li class="breadcrumb-item active">Teach me how to make a hand drawn line effect</li>
    </ol>
    <span class="badge badge-dark">november 2020</span>
    <span class="badge badge-primary">outline shader</span>
    <br><br>


    <br>
    <div class="text-center">
      <figure class="figure ">
        <img src="img/anime.jpg" class="figure-img" alt="" width="600">
      </figure>
    </div>
    <br>

    <h3 class="mt-4 mb-3">Deciding where to draw lines</h3>
    <h3 class="mt-4 mb-3"></h3>
    <p>We could draw lines based on discontinuities between pixels in <b>[depth buffer value, normal vector orientation,
      color]</b> but that will result in lines that are not very consistent and view dependent. It can still give nice
      results for sure, but lacks artistic control. Next please!</p>
    <br>
    <p>We could just make the outlines a part of the texture. This will give you accurate results and will look nice but
      this requires <b>[manual labour, talent]</b> and the lines are fixed once they are drawn. This means that you can't
      easily adjust the <b>[color, thickness, position]</b> afterwards. I want to be able to dynamically change the visuals of
      the linework inside of the engine. Next please!</p>
    <br>
    <p>Let's look at what I call 'sectioning'. We look at the entirety of the scene, divide it up in sections, give
      those sections to the outline shader which will draw lines between the sections. To decide where to draw lines, we
      will only use the red channel of the sectioning texture.</p>

    <br><br>
    <p>If you look at a scene like this.</p>

    <p>This red tint that a pixel should get can be modulated by a whole range of things [object position, normal
      vector, vertex color, shadow map, camera orientation]. One thing to consider is that when modulating with the
      shadow map, possible artifacts or a low resolution will be translated in the outlines following those artifacts.
    </p>

    <p>We should also have a 'blanco' control so that when the outline shader samples the scene and encounters this
      'blanco pixel', it thinks 'no disconinuity here'. This is useful if we want to add zones in the scene that have no
      outlines. This is different from adding a zone somewhere that just has the same red tint for all the pixels in
      that zone, because then still there will be an outline drawn around that zone. </p>

    <div class="text-center">
      <figure class="figure ">
        <img src="img/same-tint-zone.png" class="figure-img" alt="">
        <figcaption class="figure-caption">Same Tint Zone</figcaption>
      </figure>
      <figure class="figure ">
        <img src="img/blanco-zone.png" class="figure-img" alt="">
        <figcaption class="figure-caption">Blanco Zone</figcaption>
      </figure>
    </div>

    <p>For this blanco pixel we could use a red value of 0. However, then since the clearing color of our sectioning
      texture is also 0, objects touching the 'sky' will not have an outer line. We could fix this by using a different
      clearing color. Another option is to use a red value of 255 for blanco. However, then we need to remember to never
      set the red tint to 255 unless we really want it, which is annoying. For now I'm going to try using a different
      clearing color with a
      red value of 1 so that objects still get an outline when next to the 'sky'. In the end in a full game, the
      clearing color should practically never (?) be visible, and I'll always be showing an object with a custom shader
      so then this will not be so bad anymore.</p>



    <h3 class="mt-4 mb-3">Controlling the visuals of the outline</h3>
    <h3 class="mt-4 mb-3"></h3>
    <p>So far we only used the red channel of our sectioning texture, we still have the green and blue channel. So, what
      are some other properties of our outline that we want to control? <b>[color, thickness, opacity, wobbliness,
      movement]</b>
    </p>

    <br>
    <div class="text-center">
      <figure class="figure ">
        <img src="../img/line art/part 1/sectioning.png" class="figure-img" alt="" width="300">
        <figcaption class="figure-caption">sectioning texture</figcaption>
      </figure>
      <figure class="figure ">
        <img src="../img/line art/part 1/outline.png" class="figure-img" alt="" width="300">
        <figcaption class="figure-caption">outline texture</figcaption>
      </figure>
    </div>
    <br>

    <h3 class="mt-4 mb-3">Line Color</h3>
    <h3 class="mt-4 mb-3"></h3>
    <p>For the line color, the B channel of the sectioning texture is used. This gets mapped to a LUT texture, where I store the colors.</p>

    <h3 class="mt-4 mb-3">Actually drawing the lines</h3>
    <p>The outline receives the sectioning texture and now needs to find discontinuities.</p>
    <br>
    <p>Store as much data as possible in the texture. find discontinuities simple based on color? or also depth?</p>




    <h3 class="mt-4 mb-3">Make the lines hand drawn</h3>
    <p>The lines are cool, but maybe a bit too straight. Let's try offsetting them a little. For this we will use some
      noise. It's important that this happens in worldspace so that the lines don't change their offset when looking
      around. We can reconstruct world position from depth, and we have access to the depth buffer so that's what we'll
      do.</p>
    <br>

    <p>Next, let's generate some noise (perlin maybe) and add a scale/strength slider and show it on top of the world!
      Sicne world position stays the same in the scene independent of viewing angle, the noise should look like it has a
      real position in the world. We use the noise to offset the sampling position of the lines and so the lines will
      become a bit less straight. We need to make sure that the skybox is ignored because if you don't, you'll get very
      noisy patterns at the edges of your object where it 'touches the sky'.</p>


    <script src="https://gist.github.com/alexanderameye/27635d58be5d62779b794b27cfc9a52f.js"></script>
    <script src="https://gist.github.com/alexanderameye/9d2211d29b580c6eac15999732a3c2e7.js"></script>

    <h3 class="mt-4 mb-3">Shoulders of giants</h3>
    <p>Some extra reading for you.</p>
    <a
      href="https://forums.tigsource.com/index.php?topic=40832.msg1027183#msg1027183">https://forums.tigsource.com/index.php?topic=40832.msg1027183#msg1027183</a>
    <a
      href="https://forums.tigsource.com/index.php?topic=40832.msg1025558#msg1025558">https://forums.tigsource.com/index.php?topic=40832.msg1025558#msg1025558</a>
    <a href="https://twitter.com/harryh___h">https://twitter.com/harryh___h</a>
    <a href="https://twitter.com/csims314">https://twitter.com/csims314</a>
    <br><br><br>

    <ol class="breadcrumb">
      <a class="breadcrumb-item" target="_blank" href="https://twitter.com/alexanderameye" id="link">twitter</a>

      <a class="breadcrumb-item" target="_blank" href="mailto:alexanderameye@gmail.com"
        id="link">alexanderameye@gmail.com</a></li>
    </ol>


  </div>


  <script src="js/jquery/jquery.min.js"></script>
  <script src="js/popper/popper.min.js"></script>
  <script src="js/bootstrap/bootstrap.min.js"></script>
</body>

</html>