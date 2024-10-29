

/**
 * Test script for the categories API endpoint
 * Run this file with Node.js to test the categories endpoint
 */

async function testCategoriesAPI() {
    try {
        console.log('\n==========================================');
        console.log('        Testing Categories API            ');
        console.log('==========================================');

        // Make the API call
        console.log('📡 Making API request...');
        const response = await fetch('http://localhost:3000/api/categories');
        
        // Test response status
        console.log('\n✨ Testing Response Status:');
        console.log('Status:', response.status);
        console.log('OK:', response.ok);

        // Parse the JSON response
        const data = await response.json();
        
        // Log the complete response
        console.log('\n📦 API Response Data:');
        console.log(JSON.stringify(data, null, 2));

        // Test response structure
        console.log('\n🔍 Testing Response Structure:');
        console.log('Has categories array:', Array.isArray(data.categories));
        console.log('Has total count:', typeof data.total === 'number');
        
        // Log categories details
        console.log('\n📋 Categories Details:');
        console.log('Total categories:', data.total);
        console.log('\nCategories List:');
        data.categories.forEach((category, index) => {
            console.log(`${index + 1}. ${category}`);
        });

        console.log('\n✅ Test completed successfully!');
        console.log('==========================================\n');

    } catch (error) {
        console.log('\n❌ Test Failed!');
        console.log('==========================================');
        console.error('Error details:', error.message);
        console.log('==========================================\n');
    }
}

// Run the test
testCategoriesAPI();