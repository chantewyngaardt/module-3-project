<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-700 text-center">Sign Up</h2>
        <form @submit.prevent="submitForm" class="mt-4">
          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-semibold mb-1">Full Name</label>
            <input 
              v-model="formData.name" 
              type="text" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name" required>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-semibold mb-1">Email</label>
            <input 
              v-model="formData.email" 
              type="email" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email" required>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-600 text-sm font-semibold mb-1">Password</label>
            <input 
              v-model="formData.password" 
              type="password" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password" required>
          </div>
  
          <button 
            type="submit" 
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  </template>