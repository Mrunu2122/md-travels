const axios = require('axios');

const API_BASE_URL = "http://localhost:8000"; // Update this to your backend URL

console.log('🔍 Testing MD Tours & Travels Backend Connection...\n');

async function testBackend() {
    try {
        // Test 1: Basic connectivity
        console.log('1️⃣ Testing basic connectivity...');
        const healthCheck = await axios.get(`${API_BASE_URL}/`);
        console.log('✅ Backend is running:', healthCheck.data);

        // Test 2: Health check with database
        console.log('\n2️⃣ Testing database health...');
        const healthResponse = await axios.get(`${API_BASE_URL}/health`);
        console.log('✅ Database health check:', healthResponse.data);

        // Test 3: Test trip creation
        console.log('\n3️⃣ Testing trip creation...');
        const testTrip = {
            total_trips: 5,
            working_hours: "8h",
            trip_date: new Date().toISOString().split('T')[0],
            earnings_ola: 1200,
            earnings_uber: 800,
            earnings_rapido: 400,
            gross_earnings: 2400
        };

        const tripResponse = await axios.post(`${API_BASE_URL}/trips`, testTrip);
        console.log('✅ Trip created successfully:', tripResponse.data);

        // Test 4: Test expense creation
        console.log('\n4️⃣ Testing expense creation...');
        const testExpense = {
            fuel: 500,
            other: 200,
            expense_date: new Date().toISOString().split('T')[0]
        };

        const expenseResponse = await axios.post(`${API_BASE_URL}/expenses`, testExpense);
        console.log('✅ Expense created successfully:', expenseResponse.data);

        // Test 5: Test profile creation
        console.log('\n5️⃣ Testing profile creation...');
        const testProfile = {
            name: "Test Driver",
            car_model: "Test Car",
            rating: 4
        };

        const profileResponse = await axios.post(`${API_BASE_URL}/profile`, testProfile);
        console.log('✅ Profile created successfully:', profileResponse.data);

        // Test 6: Retrieve all data
        console.log('\n6️⃣ Testing data retrieval...');
        const trips = await axios.get(`${API_BASE_URL}/trips`);
        const expenses = await axios.get(`${API_BASE_URL}/expenses`);
        const profile = await axios.get(`${API_BASE_URL}/profile`);

        console.log('✅ Trips retrieved:', trips.data.length, 'records');
        console.log('✅ Expenses retrieved:', expenses.data.length, 'records');
        console.log('✅ Profile retrieved:', profile.data);

        // Test 7: Verify integer values
        console.log('\n7️⃣ Verifying integer values...');
        const latestTrip = trips.data[trips.data.length - 1];
        const latestExpense = expenses.data[expenses.data.length - 1];

        console.log('✅ Trip earnings are integers:',
            typeof latestTrip.gross_earnings === 'number' &&
            Number.isInteger(latestTrip.gross_earnings));
        console.log('✅ Expense amounts are integers:',
            typeof latestExpense.fuel === 'number' &&
            Number.isInteger(latestExpense.fuel));

        console.log('\n🎉 All backend tests passed!');
        console.log('📱 Your app is ready for APK generation.');

    } catch (error) {
        console.error('❌ Backend test failed:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: error.config?.url
        });

        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure your backend is running (uvicorn app.main:app --reload)');
        console.log('2. Check your MongoDB Atlas connection in backend/.env');
        console.log('3. Verify your API_BASE_URL is correct:', API_BASE_URL);
        console.log('4. Ensure all required dependencies are installed');
        console.log('5. Check if MongoDB Atlas cluster is accessible');
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Backend is not running. Start it with:');
            console.log('   cd backend');
            console.log('   python -m uvicorn app.main:app --reload');
        }
        
        if (error.response?.status === 500) {
            console.log('\n💡 Server error. Check MongoDB connection:');
            console.log('   - Verify MONGO_URI in backend/.env');
            console.log('   - Check if MongoDB Atlas cluster is running');
            console.log('   - Ensure network access is allowed');
        }
    }
}

// Run the test
testBackend(); 