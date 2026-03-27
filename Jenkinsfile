pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t dockerusergauri/devops-app .'
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
                    sh 'docker push dockerusergauri/devops-app'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                // Stop and remove old container
                sh '''
                    docker stop devops-app || true
                    docker rm devops-app || true
                '''
                // Run new container (add -v for development hot-reload if needed)
                sh 'docker run -d -p 3000:3000 --name devops-app dockerusergauri/devops-app'
            }
        }

    }
}
