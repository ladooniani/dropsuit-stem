const fs = require("fs");
const path = require("path");

function loadData(base) {
  if (base == false) {
    const filePath = path.join(__dirname, "data", "data.json");
    if (fs.existsSync(filePath)) {
      try {
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(jsonData);
        roots = data.roots;
        short_roots = data.short_roots;
        endings = data.endings;
        let load = [roots, short_roots, endings];
        return load;
      } catch (err) {
        console.error("Error reading data.json file:", err);
      }
    } else {
      console.warn("Warn: data.json file does not exist.");
      return false;
    }
  } else {
    return false;
  }
}

function saveData(base, rootsarr, shortrootsarr, endingsarr) {
  if (base == true) {
    let roots, short_roots, endings;

    if (
      rootsarr &&
      shortrootsarr &&
      endingsarr &&
      Array.isArray(rootsarr) &&
      Array.isArray(shortrootsarr) &&
      Array.isArray(endingsarr)
    ) {
      roots = rootsarr;
      short_roots = shortrootsarr;
      endings = endingsarr;
      const dirPath = path.join(__dirname, "data");
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      const filePath = path.join(dirPath, "data.json");
      if (!fs.existsSync(filePath)) {
        const data = {
          roots: roots,
          short_roots: short_roots,
          endings: endings,
        };
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData, "utf-8");
      } else {
        const data = {
          roots: roots,
          short_roots: short_roots,
          endings: endings,
        };
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(filePath, jsonData, "utf-8");
      }
    }
  }
}

module.exports = {
  loadData,
  saveData,
};
