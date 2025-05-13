// スキーマからTypeScript型定義を生成するスクリプト
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generateTypes() {
  try {
    const schemaPath = path.resolve(__dirname, '../schema/manga-api.json');
    const outputPath = path.resolve(__dirname, '../types/manga-api.generated.ts');
    
    console.log('Generating TypeScript types from OpenAPI schema...');
    
    // openapi-typescript CLIを使用して型を生成
    const command = `npx openapi-typescript ${schemaPath} --output ${outputPath}`;
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Error generating types:', stderr);
      return;
    }
    
    console.log('Types generated successfully!');
    console.log(stdout);
    
    console.log(`Types written to: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate types:', error);
  }
}

generateTypes();
