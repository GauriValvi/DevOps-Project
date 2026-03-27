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
        sh "docker ps -q --filter name=devops-app | grep -q . && docker rm -f devops-app || true"
        sh "docker run -d --name devops-app -p 3000:3000 dockerusergauri/devops-app"
    }
}

    }

    post {
        always {
            sh "docker ps -a"
        }
    }
}
