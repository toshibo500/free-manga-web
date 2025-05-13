// Type generation script
console.log("Generating API types from OpenAPI schema...");

const { execSync } = require("child_process");

try {
  const schemaPath = "/app/src/schema/manga-api.json";
  const outputPath = "/app/src/types/manga-api.generated.ts";

  console.log(`Schema path: ${schemaPath}`);
  console.log(`Output path: ${outputPath}`);

  // Execute the openapi-typescript command
  const command = `npx openapi-typescript "${schemaPath}" -o "${outputPath}"`;
  console.log(`Executing: ${command}`);

  execSync(command, { stdio: "inherit" });

  console.log("Types generated successfully!");
} catch (error) {
  console.error("Failed to generate types:", error);
  process.exit(1);
}
