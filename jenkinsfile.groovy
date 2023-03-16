pipeline {
    agent any
    
    stages() {
        stage('git clone') {
            steps() {
                git branch: 'develop', credentialsId: 'chorongddara', url: 'git@lab.ssafy.com:s08-ai-image-sub2/S08P22C101.git'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }    
    }
}
