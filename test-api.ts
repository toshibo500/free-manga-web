// Test script for API integration
import { fetchMangaById, fetchMangasByCategory } from './src/api/mangaApi';

async function testApiIntegration() {
  try {
    console.log('Testing manga API integration with OpenAPI...');
    
    // Test fetching manga by ID
    console.log('1. Testing fetchMangaById...');
    // Swagger 2.0の定義ではIDが整数値のため、数値IDを使用
    const manga = await fetchMangaById('1');
    console.log('Manga details:', manga);
    
    // Test fetching manga by category
    console.log('\n2. Testing fetchMangasByCategory...');
    const mangaList = await fetchMangasByCategory('shounen');
    console.log(`Found ${mangaList.length} manga in category 'shounen'`);
    console.log('First manga:', mangaList[0]);
    
    console.log('\nAPI tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testApiIntegration();
