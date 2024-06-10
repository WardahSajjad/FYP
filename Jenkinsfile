pipeline {
    agent any
    
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    // Build client Docker image
                    dir('client') {
                        docker.build('wardasajjad/zendrive-client-hub', '.')
                    }
                    
                    // Build server Docker image
                    dir('server') {
                        docker.build('wardasajjad/zendrive-server-hub', '.')
                    }
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    // Push client Docker image
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_credentials') {
                        docker.image('wardasajjad/zendrive-client').push()
                    }
                    
                    // Push server Docker image
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub_credentials') {
                        docker.image('wardasajjad/zendrive-server').push()
                    }
                }
            }
        }
    }
}

//changed the name again