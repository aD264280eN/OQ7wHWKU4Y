// 代码生成时间: 2025-08-30 16:03:50
import { PrismaClient, TextFile } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import util from 'util';

// Create a Prisma client instance
const prisma = new PrismaClient();

// Async file reader function using util.promisify
const readFileAsync = util.promisify(fs.readFile);

class TextFileAnalyzer {
  // Analyze the content of a text file
  public async analyzeTextFile(filePath: string): Promise<{ wordCount: number; lineCount: number; charCount: number; }> {
    try {
      // Read the file content
      const fileContent = await readFileAsync(filePath, { encoding: 'utf8' });

      // Split the content into lines and words
      const lines = fileContent.split('\
');
      const words = fileContent.split(' ');

      // Calculate word count, line count, and character count
      const wordCount = words.filter((word) => word.length > 0).length;
      const lineCount = lines.length;
      const charCount = fileContent.length;

      // Return the analysis results
      return { wordCount, lineCount, charCount };
    } catch (error) {
      // Handle errors
      console.error('Error analyzing the text file:', error);
      throw error;
    }
  }

  // Save text file analysis results to the database
  public async saveAnalysisResults(filePath: string, analysisResults: { wordCount: number; lineCount: number; charCount: number; }): Promise<TextFile> {
    try {
      // Create a new TextFile record with analysis results
      const textFile = await prisma.textFile.create({
        data: {
          filePath,
          wordCount: analysisResults.wordCount,
          lineCount: analysisResults.lineCount,
          charCount: analysisResults.charCount,
        },
      });

      // Return the saved TextFile record
      return textFile;
    } catch (error) {
      // Handle errors
      console.error('Error saving analysis results to the database:', error);
      throw error;
    }
  }
}

// Usage example
const analyzer = new TextFileAnalyzer();
const filePath = path.join(__dirname, 'example.txt');

analyzer.analyzeTextFile(filePath)
  .then(analysisResults => {
    console.log('Analysis Results:', analysisResults);
    return analyzer.saveAnalysisResults(filePath, analysisResults);
  })
  .then(savedTextFile => {
    console.log('Saved Text File:', savedTextFile);
  })
  .catch(error => {
    console.error('Error:', error);
  });