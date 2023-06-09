const fs = require("fs");

module.exports = function (eleventyConfig) {
  const passthroughDirs = ["src/img", "src/css", "src/fonts", "CNAME"];
  passthroughDirs.forEach((dir) => eleventyConfig.addPassthroughCopy(dir));

  const getSvgContent = function (file) {
    let relativeFilePath = `./src/img/${file}.svg`;
    let data = fs.readFileSync(relativeFilePath, function (err, contents) {
      if (err) return err;
      return contents;
    });

    return data.toString("utf8");
  };
  eleventyConfig.addShortcode("svg", getSvgContent);

  function formatDateHuman(date) {
    if (!date) return "";
    if (typeof date === "string") return formatDateHuman(new Date(date));

    const monthNames = [
      "januar",
      "februar",
      "mars",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "desember",
    ];
    return `${date.getDate()}. ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  eleventyConfig.addFilter("formatDateISO", (date) =>
    date ? date.toISOString().substring(0, 10) : ""
  );
  eleventyConfig.addFilter("formatDateHuman", formatDateHuman);

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};

