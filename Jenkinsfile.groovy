pipeline {
    agent any
    
    stages() {
        stage('Prepare') {
            steps {
                echo 'Preparing..'
            }
        }
        stage('Build') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'chorongddaraDeploy',
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: '''
                                        sudo docker image prune -a
                                        cd /jenkins/workspace/chorongddara
                                        pwd
                                        sudo docker-compose build
                                    ''',
                                    execTimeout: 600000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: 'chorongddara',
                                    sourceFiles: 'chorongddara/**/*'
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false
                        )
                    ]
                )
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'chorongddaraDeploy',
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: '''
                                        cd /jenkins/workspace/chorongddara
                                        pwd
                                        sudo docker-compose up -d
                                    ''',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: 'chorongddara',
                                    sourceFiles: 'chorongddara/**/*')
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false
                        )
                    ]
                )
            }
        }
    }
}
