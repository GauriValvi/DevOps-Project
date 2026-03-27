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
        sh '''
            # Remove any existing container named devops-app
            if [ $(docker ps -aq -f name=devops-app) ]; then
                docker rm -f devops-app
            fi

            # Run the new container
            docker run -d -p 3000:3000 --name devops-app dockerusergauri/devops-app
        '''
    }
}

    }
}
