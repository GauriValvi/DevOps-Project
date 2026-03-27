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
                withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'PASS')]) {
                    sh 'docker login -u dockerusergauri -p $PASS'
                    sh 'docker push dockerusergauri/devops-app'
                }
            }
        }

    }
}
