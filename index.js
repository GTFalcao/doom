const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const accPath = path.join(__dirname, "./acc");
const acsPath = path.join(__dirname, "./outcast/acs");
const acsFiles = fs.readdirSync(acsPath)?.filter((file) => file.endsWith(".acs")) ?? [];
acsFiles.forEach(file => {
  const filePath = path.join(acsPath, file);
  exec(`acc.exe ${filePath} ${filePath.replace(".acs", ".o")}`, { cwd: accPath }, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(stdout);
    // console.log(stderr);
  });
})
