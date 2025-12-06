<template>
  <footer class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-bright-blue to-lime rounded-xl flex items-center justify-center"
            >
              <i class="fas fa-dumbbell text-white"></i>
            </div>
            <span class="text-xl font-bold text-white">FitBuddy</span>
          </div>
          <p class="text-gray-400 text-sm">
            Pendamping kebugaran Anda untuk hidup yang lebih sehat dan lebih bahagia.
          </p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a
              href="https://github.com/NandoCraz"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-bright-blue hover:text-white transition-all"
              target="_blank"
            >
                <i class="fab fa-github"></i>
            </a>
            <a
              href="https://www.instagram.com/nndopris/"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-bright-blue hover:text-white transition-all"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-bright-blue hover:text-white transition-all"
              target="_blank"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div
        class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm"
      >
        <p>&copy; {{ new Date().getFullYear() }} FitBuddy. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

