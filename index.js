const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { zip } = require("zip-a-folder");

const accPath = path.join(__dirname, "./acc");
const acsPath = path.join(__dirname, "./outcast/acs");
const acsFiles =
  fs.readdirSync(acsPath)?.filter((file) => file.endsWith(".acs")) ?? [];

async function build() {
  await Promise.allSettled(
    acsFiles.map(
      (file) =>
        new Promise((resolve) => {
          const filePath = path.join(acsPath, file);
          exec(
            `acc.exe ${filePath} ${filePath.replace(".acs", ".o")}`,
            { cwd: accPath },
            (err, stdout, stderr) => {
              if (err) {
                console.log(err);
              }
              resolve();
              // console.log(stdout);
              // console.log(stderr);
            }
          );
        })
    )
  );

  await zip(path.join(__dirname, "/outcast"), path.join(__dirname, "/dist/outcast.pk3"));
}

build();
