pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FrontEnd/travel-bucketlist') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-ff" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-ff"
                )

                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-ff"
                xcopy /E /I /Y FrontEnd\\travel-bucketlist\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-ff"

                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BackEnd/travel-bucketlist-backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
    steps {
        bat '''
        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-bb.war" (
            del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-bb.war"
        )
        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-bb" (
            rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-bb"
        )
        copy "BackEnd\\travel-bucketlist-backend\\target\\tt-bb.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\tt-bb.war"
        '''
    }
}

    }

    post {
        success {
            echo ' Deployment Successful!'
        }
        failure {
            echo ' Pipeline Failed. Check Jenkins logs.'
        }
    }
}