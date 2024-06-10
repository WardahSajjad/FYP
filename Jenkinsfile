pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerCredentials-101')
        CLIENT_IMAGE = 'wardasajjad/zendrive-client-hub'
        SERVER_IMAGE = 'wardasajjad/zendrive-server-hub'
    }
    
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    // Build client Docker image
                    dir('client') {
                        docker.build("$CLIENT_IMAGE", '.')
                    }
                    
                    // Build server Docker image
                    dir('server') {
                        docker.build("$SERVER_IMAGE", '.')
                    }
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerCredentials-101') {
                        // Push client Docker image
                        docker.image("$CLIENT_IMAGE").push()
                        
                        // Push server Docker image
                        docker.image("$SERVER_IMAGE").push()
                    }
                }
            }
        }
    }
}
