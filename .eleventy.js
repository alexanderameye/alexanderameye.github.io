const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img")
const path = require('path')
const CleanCSS = require("clean-css");

async function projectImageShortcode(src, alt, sizes, url) {
    console.log(url);
    const imgPath = url ? url : "img";
    console.log(`Generating image(s) from:  ${src}`)
    if (alt === undefined) {
        // Throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
    }
    const metadata = await Image(src, {
        widths: [300, 400, 600],
        formats: ['webp', 'jpeg'],
        urlPath: url,
        outputDir: "_site/" + imgPath,
        filenameFormat: function(id, src, width, format, options) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}-${width}w.${format}`
        }
    });
    const imageAttributes = {
        class: "project-entry-image",
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };
    return Image.generateHTML(metadata, imageAttributes);
}


async function noteImageShortcode(src, alt, sizes, url) {
    const imgPath = url ? url : "img";
    console.log(`Generating image(s) from:  ${src}`)
    if (alt === undefined) {
        // Throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
    }
    const metadata = await Image(src, {
        widths: [300, 400, 600],
        formats: ['webp', 'jpeg'],
        urlPath: ".",
        outputDir: "_site/" + imgPath,
        filenameFormat: function(id, src, width, format, options) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}-${width}w.${format}`
        }
    });
    const imageAttributes = {
        class: "note-image",
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };
    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {

    // MARKDOWN 
    let md = require("markdown-it");
    let mila = require("markdown-it-link-attributes");
    let markdownItKatex = require("markdown-it-katex");
    let options = {
        html: true,
        breaks: false,
        linkify: true
    };
    let milaOptions = {
        attrs: {
            target: "_blank",
            rel: "noopener noreferrer"
        }
    };
    let katexOptions = { "throwOnError": false, "errorColor": " #cc0000" }
    let markdownLib = md(options).use(mila, milaOptions).use(markdownItKatex, katexOptions);

    eleventyConfig.addFilter("relativedate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('en').toRelative();
    });

    eleventyConfig.addFilter("formatteddate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale('en').toFormat('LLLL d, yyyy');
    });


    eleventyConfig.setLibrary("md", markdownLib);

    // this is to make sure that hot reload works for notes directory and not just 'posts'
    eleventyConfig.addWatchTarget('notes');
    eleventyConfig.addWatchTarget('projects');

    /* SHORTCODES */
    eleventyConfig.addShortcode("download", function(name, url) {
        return `<a href="${url}" download rel="nofollow" class="download-button">${name}</a>`;
    });


    eleventyConfig.addNunjucksAsyncShortcode("noteimage", noteImageShortcode)
    eleventyConfig.addLiquidShortcode("noteimage", noteImageShortcode)
    eleventyConfig.addJavaScriptFunction("noteimage", noteImageShortcode)
    eleventyConfig.addNunjucksAsyncShortcode("projectimage", projectImageShortcode)
    eleventyConfig.addLiquidShortcode("projectimage", projectImageShortcode)
    eleventyConfig.addJavaScriptFunction("projectimage", projectImageShortcode)
    eleventyConfig.addShortcode('readingTime', function(text) {
        // remove html tags
        var regex = /(&nbsp;|<([^>]+)>)/ig,
            body = text,
            result = body.replace(regex, "");

        let wordCount = `${result}`.match(/\b[-?(\w+)?]+\b/gi).length;
        //calculate time in munites based on average reading time
        let timeInMinutes = (wordCount / 225)
            //validation as we don't want it to show 0 if time is under 30 seconds
        let output;
        if (timeInMinutes <= 0.5) {
            output = 1;
        } else {
            //round to nearest minute
            output = Math.round(timeInMinutes);
        }

        return `${output}` + '-minute read' + ``;
    });

    /* COLLECTIONS */

    eleventyConfig.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(item => {
            (item.data.tags || []).forEach(function(tag)

                {
                    if (!item.data.draft) tagSet.add(tag);

                });
        });

        return [...tagSet];
    });

    eleventyConfig.addCollection("notes", (collection) => {
        return collection
            .getFilteredByGlob("./notes/**/*.md");
        // .filter((note) => !note.data.draft);
    });


    /* FILTERS */
    eleventyConfig.addFilter("filterTagList", (tags) => {
        // should match the list in tags.njk
        return (tags || []).filter(tag => ["note"].indexOf(tag) === -1 && ["project"].indexOf(tag) === -1);
    })



    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });


    // THIS IS NEEDED FOR TAGS TO WORK!
    eleventyConfig.setDataDeepMerge(true);





    // copy the 'css' and 'img' folders to the output
    //eleventyConfig.addPassthroughCopy("css");
    //eleventyConfig.addPassthroughCopy("assets");







    // Files to output in build.
    let filesToCopy = ["assets/**/*", "downloads/**/*", "css", "notes/**/*.{jpg,jpeg,png,gif,webp,mp4,webm}"]

    // https://www.11ty.dev/docs/copy/#change-the-output-directory
    filesToCopy.forEach((file) => {
        eleventyConfig.addPassthroughCopy(file);
    })

    return {
        dir: {
            input: ".",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
            output: "_site"
        }
    };
};