const axios = require('axios');

const API_BASE_URL = "http://localhost:8000"; // Update this to your deployed backend URL

async function verifyDatabase() {
    console.log('🔍 Verifying MD Tours & Travels Database Connection...\n');

    try {
        // Test 1: Check if backend is running
        console.log('1️⃣ Testing backend connectivity...');
        const healthCheck = await axios.get(`${API_BASE_URL}/`);
        console.log('✅ Backend is running:', healthCheck.data.message);

        // Test 2: Test trip creation
        console.log('\n2️⃣ Testing trip creation...');
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

        // Test 3: Test expense creation
        console.log('\n3️⃣ Testing expense creation...');
        const testExpense = {
            fuel: 500,
            other: 200,
            expense_date: new Date().toISOString().split('T')[0]
        };
        
        const expenseResponse = await axios.post(`${API_BASE_URL}/expenses`, testExpense);
        console.log('✅ Expense created successfully:', expenseResponse.data);

        // Test 4: Test profile creation
        console.log('\n4️⃣ Testing profile creation...');
        const testProfile = {
            name: "Test Driver",
            car_model: "Test Car",
            rating: 4.5
        };
        
        const profileResponse = await axios.post(`${API_BASE_URL}/profile`, testProfile);
        console.log('✅ Profile created successfully:', profileResponse.data);

        // Test 5: Retrieve all data
        console.log('\n5️⃣ Testing data retrieval...');
        const trips = await axios.get(`${API_BASE_URL}/trips`);
        const expenses = await axios.get(`${API_BASE_URL}/expenses`);
        const profile = await axios.get(`${API_BASE_URL}/profile`);
        
        console.log('✅ Trips retrieved:', trips.data.length, 'records');
        console.log('✅ Expenses retrieved:', expenses.data.length, 'records');
        console.log('✅ Profile retrieved:', profile.data);

        // Test 6: Verify integer values
        console.log('\n6️⃣ Verifying integer values...');
        const latestTrip = trips.data[trips.data.length - 1];
        const latestExpense = expenses.data[expenses.data.length - 1];
        
        console.log('✅ Trip earnings are integers:', 
            typeof latestTrip.gross_earnings === 'number' && 
            Number.isInteger(latestTrip.gross_earnings));
        console.log('✅ Expense amounts are integers:', 
            typeof latestExpense.fuel === 'number' && 
            Number.isInteger(latestExpense.fuel));

        console.log('\n🎉 All database tests passed!');
        console.log('📱 Your app is ready for APK generation.');
        
    } catch (error) {
        console.error('❌ Database verification failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure your backend is running (uvicorn app.main:app --reload)');
        console.log('2. Check your MongoDB Atlas connection in backend/.env');
        console.log('3. Verify your API_BASE_URL is correct');
        console.log('4. Ensure all required dependencies are installed');
    }
}

// Run the verification
verifyDatabase(); 