# Recipe Finder - Web Infrastructure

## Description
A web application that allows users to search for and discover recipes using the Spoonacular API. The app provides an intuitive interface for browsing, viewing, and learning about various recipes, making it ideal for food enthusiasts and home cooks.

## Features
- Search for recipes by keyword
- View detailed recipe information
- Responsive and user-friendly design
- About and Contact pages for additional information

## Screenshots
<img width="949" height="444" alt="image" src="https://github.com/user-attachments/assets/67425a3f-da59-471c-89cc-65bd3dfddd3c" />
<img width="907" height="431" alt="image" src="https://github.com/user-attachments/assets/fc9760a8-86d6-4fbe-9ad4-5ead6916d20d" />
<img width="947" height="448" alt="image" src="https://github.com/user-attachments/assets/0cff6df3-4bf3-4770-a1d6-e5dd65e7cab9" />
<img width="923" height="418" alt="image" src="https://github.com/user-attachments/assets/7dc1ad92-09b1-47bb-a802-4449f2eb6673" />

## Docker Image Details

### Docker Hub Repository
- **Repository URL**: `https://hub.docker.com/repository/docker/bsandrine/recipe-finder`
  - `latest` - Latest stable version
  - `v1.0.0` - Version 1.0.0 release

### Image Information
- **Base Image**: `nginx:alpine`
- **Port**: 80
- **Size**: ~15MB (compressed)
- **Architecture**: Multi-platform (linux/amd64, linux/arm64)

## Build Instructions

### Prerequisites
- Docker installed on your system
- Git to clone the repository

### Local Build Commands
```bash
# Clone the repository
git clone https://github.com/b-sandrine/recipe-finder
cd recipe-finder

# Build the Docker image
docker build -t recipe-finder:v1 .

# Push to Docker Hub
docker push bsandrine/recipe-finder:v1.0.0
```

## Run Instructions

### Web01/Web02 Deployment Commands

#### Web01 Server
```bash
# Pull the latest image
docker pull bsandrine/recipe-finder:v1

# Run the container
docker run -d --name web-01 -p 8080:80 bsandrine/recipe-finder:v1
```

#### Web02 Server
```bash
# Pull the latest image
docker pull bsandrine/recipe-finder:v1

# Run the container
docker run -d --name web-02 -p 8081:80 bsandrine/recipe-finder:v1
```

### Environment Variables
- `API_KEY`: Your Spoonacular API key (required for recipe data)

### Port Mapping
- Web01: `8080:80` (external:internal)
- Web02: `8081:80` (external:internal)

# Load balancing

### 3. Verify Load Balancing (Round-Robin)
```bash
# Test load balancer multiple times to see round-robin in action
for i in {1..10}; do
    echo "Request $i:"
    curl -s http://localhost:8082/ | grep -o "Server:.*" || echo "No server header found"
    sleep 1
done
```

### Expected Evidence
- Both containers should be running and healthy
- Load balancer should distribute requests between Web01 and Web02
- Response times should be consistent
- No single point of failure

## Local Development

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/b-sandrine/recipe-finder
   ```
2. Navigate to the project directory:
   ```bash
   cd recipe-finder
   ```
3. Open `index.html` in your web browser to start using the app.

### Usage
- Enter a search term(s) in the search bar to find recipes. Comma separated values.
- Click on a recipe to view its details.
- Visit the About and Contact pages for more information or to get in touch.

## Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla)
- [Spoonacular API](https://spoonacular.com/food-api)
- Docker
- Nginx
- HAProxy (Load Balancer)

## Youtube video discription
Link: https://youtu.be/IPOuJsSMKMU

## API Reference
This project uses the [Spoonacular API](https://spoonacular.com/food-api) to fetch recipe data. You may need to sign up for an API key to access all features.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your improvements or bug fixes.

## Contact
For questions or feedback, please contact [sanrdushimimana@gmail.com] or [s.dushimima2@alustudent.com].
