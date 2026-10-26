<template>
  <div class="url-shortener-container">
    <div class="url-shortener-card">
      <h1 class="title">URL Shortener</h1>
      <p class="subtitle">Shorten your long URLs quickly and easily</p>

      <div class="input-section">
        <input
          type="url"
          placeholder="Enter your long URL here..."
          v-model="longUrl"
          :disabled="isLoading"
          class="url-input"
          @keyup.enter="handleShortenUrl"
        />
        <div class="button-group">
          <button
            @click="handleShortenUrl"
            :disabled="isLoading || !longUrl.trim()"
            class="shorten-btn"
          >
            {{ isLoading ? "Shortening..." : "Shorten URL" }}
          </button>
          <button
            v-if="shortUrl || error"
            @click="handleReset"
            class="reset-btn"
            :disabled="isLoading"
          >
            Reset
          </button>
        </div>
      </div>

      <div v-if="error" class="error-message">
        <span>❌ {{ error }}</span>
      </div>

      <div v-if="shortUrl" class="result-section">
        <h3>Your shortened URL:</h3>
        <div class="result-container">
          <input type="text" :value="shortUrl" readonly class="result-input" />
          <button
            @click="handleCopyToClipboard"
            class="copy-btn"
            title="Copy to clipboard"
          >
            📋 Copy
          </button>
        </div>
        <div class="result-actions">
          <a
            :href="shortUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="test-link"
          >
            🔗 Test Link
          </a>
        </div>
      </div>

      <div class="info-badge">
        <span class="badge">URL Shortener Service</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const longUrl = ref("");
const shortUrl = ref("");
const isLoading = ref(false);
const error = ref("");

const handleShortenUrl = async () => {
  if (!longUrl.value) return;

  isLoading.value = true;
  error.value = "";
  shortUrl.value = "";

  try {
    const response = await fetch("http://localhost:8080/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ long_url: longUrl.value }),
    });

    if (response.ok) {
      const data = await response.json();
      shortUrl.value = data.short_url;
    } else {
      const errorData = await response.json();
      error.value = errorData.error || "Failed to shorten URL";
    }
  } catch (err) {
    console.error("Error shortening URL:", err);
    error.value = "Network error. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const handleCopyToClipboard = async () => {
  if (shortUrl.value) {
    try {
      await navigator.clipboard.writeText(shortUrl.value);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }
};

const handleReset = () => {
  longUrl.value = "";
  shortUrl.value = "";
  error.value = "";
};
</script>

<style scoped>
.url-shortener-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.url-shortener-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.input-section {
  margin-bottom: 2rem;
}

.url-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.url-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.url-input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.shorten-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 150px;
}

.shorten-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.shorten-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.reset-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
}

.error-message {
  background: #ffeaa7;
  border: 1px solid #fdcb6e;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
  color: #e17055;
  font-weight: 500;
}

.result-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
}

.result-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.result-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.result-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 0.9rem;
  background: white;
}

.copy-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  transition: transform 0.2s, box-shadow 0.2s;
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(39, 174, 96, 0.3);
}

.result-actions {
  margin-top: 1rem;
}

.test-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.test-link:hover {
  color: #764ba2;
}

.info-badge {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
}

.badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .url-shortener-card {
    padding: 2rem;
    margin: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .button-group {
    flex-direction: column;
  }

  .result-container {
    flex-direction: column;
  }
}
</style>
