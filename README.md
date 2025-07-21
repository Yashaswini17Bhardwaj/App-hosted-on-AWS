# Demo App for DevOps Assignment

This is a simple Node.js Express application serving a "Hello World" page, containerized with Docker, and deployed to an AWS EKS cluster via a GitHub Actions CI/CD pipeline. It demonstrates production-level practices like modular infrastructure (Terraform), automated testing, vulnerability scanning, and staged deployments with manual approval.

## Prerequisites
- Node.js (v14+)
- NPM (v6+)
- Docker Desktop
- AWS CLI configured with access to EKS cluster
- GitHub account with secrets set up (e.g., DOCKER_USERNAME, KUBE_CONFIG)
- kubectl installed and configured for EKS

## Setup Instructions
1. **Clone the Repository** 

2. **Install Dependencies**:
npm install


3. **Run Tests Locally**:
npm test

- This executes unit and integration tests using Mocha and Supertest.

## How to Run Locally
1. Start the app:
npm start

2. Open a browser and visit `http://localhost:3000` to see "Hello World from Demo App!".
3. For Dockerized local run:


docker build -t demo-app:latest .
docker run -p 3000:3000 demo-app:latest

- Access at `http://localhost:3000`.

## Pipeline Overview
The CI/CD pipeline is defined in `.github/workflows/cicd.yaml` and automates the following on GitHub:

- **On Pull Request (PR) Creation**: Runs unit/integration tests to ensure code quality before merging.
- **On Merge to Main**:
- Builds and pushes the Docker image to Docker Hub.
- Scans the image for vulnerabilities using Trivy.
- Deploys to a staging namespace in EKS.
- **Manual Approval**: Requires approval for production deployment to prevent unvetted changes.
- **Production Deployment**: Deploys to a production namespace in EKS.
- **Notifications**: Sends email alerts on failures using GitHub Actions.

### Key Features and Best Practices
- **Testing**: Unit tests for endpoints; integration tests with Supertest.
- **Security**: Vulnerability scanning on images; secrets managed via GitHub Secrets.
- **Environments**: Separate staging/production namespaces in EKS for isolation.
- **Versioning**: Images tagged with commit SHA for traceability.
- **Extensibility**: Add linting (e.g., ESLint) or coverage reports (e.g., NYC) to the test job for enhanced quality gates.

## Deployment to EKS
1. Update `kubernetes/deployment.yaml` with  Docker image.
2. Apply manifests:

kubectl apply -f kubernetes/deployment.yaml -n staging
kubectl apply -f kubernetes/service.yaml -n staging

3. Access via  ALB DNS (from Terraform outputs).

 
