
# 🧪 Product Analyser - MERN Stack Application

## 📝 Overview
Product Analyser is a comprehensive solution that allows users to upload images of product labels (cosmetics, food, or personal care), extract the ingredient information using AWS Rekognition's OCR capabilities, and display the safety grades of ingredients through interactive visualizations. A real-time chatbot also provides instant answers and problem-solving related to the product.

## ✨ Features
- 🖼️ **Image Upload**: Users can upload product labels for automatic ingredient extraction.
- 🔍 **OCR Extraction**: Uses AWS Rekognition to extract text from product images.
- 🧪 **Safety Grading**: Ingredients are matched with a grading list stored in a MongoDB database, and a safety grade is assigned based on a 3-tier grading system.
- 📊 **Visual Feedback**: Circular and bar graphs are generated to show the ingredient safety grades and overall product safety.
- 🤖 **Real-Time Chatbot**: A chatbot powered by AWS Lambda and AWS Bedrock answers queries related to the product and helps users resolve issues.

## 🛠️ Technologies Used

### Frontend:
- React.js
- Chart.js for data visualization (circular & bar graphs)
- Axios for API requests

### Backend:
- Node.js & Express.js
- MongoDB for storing product data and ingredient grading information

### AWS Services:
- S3 for storing uploaded images
- Rekognition for OCR text extraction
- Lambda and AWS Bedrock for the chatbot functionality

## 🚀 Installation & Setup

### ✅ Prerequisites
- Node.js (v16 or above)
- MongoDB instance (local or cloud)
- AWS account with permissions for S3, Rekognition, Lambda, and Bedrock

### 📁 Clone the Repository
```bash
git clone https://github.com/srijandubey9452/ProductAnalyser.git
cd ProductAnalyser
```

### 📦 Install Dependencies  
🔷 For the Frontend:
```bash
cd client
npm install
```

🔷 For the Backend:
```bash
cd server
npm install
```

### 🔐 Set Up AWS Credentials
Ensure your AWS credentials are configured:
```bash
aws configure
```
Make sure you have access to:
- S3
- Rekognition
- Lambda
- Bedrock

### ▶️ Start the Application

Start the backend:
```bash
cd server
npm start
```

Start the frontend:
```bash
cd client
npm start
```

## 🧾 Upload an Image
Once the application is running, go to the frontend, select a product category (cosmetics, food, personal care), and upload an image of a product label. The image will be processed, and the safety grading of ingredients will be displayed, along with interactive graphs.

## 💬 Chatbot
Use the chatbot feature to ask real-time questions regarding the product and receive helpful answers or solutions.

## 📈 Usage
- Upload images to evaluate the ingredient safety.
- View safety grades and visualize data with graphs.
- Use the chatbot to answer product-related questions.

## 🔮 Future Improvements
- Add a more comprehensive database of products and their ingredients.
- Improve the chatbot's intelligence with more context-based answers.
- Enhance the ingredient grading system with more factors.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
