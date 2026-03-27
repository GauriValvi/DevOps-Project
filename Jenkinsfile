pipeline {
    agent any

    environment {
        IMAGE_NAME = "dockerusergauri/devops-app"
        CONTAINER_NAME = "devops-app"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-pass',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh "docker push $IMAGE_NAME"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop and remove old container if it exists
                sh "docker rm -f $CONTAINER_NAME || true"
                // Run the new container
                sh "docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME"
            }
        }

    }

    post {
        always {
            sh "docker ps -a"
        }
    }
}
