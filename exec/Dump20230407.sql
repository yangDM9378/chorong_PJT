CREATE DATABASE  IF NOT EXISTS `chorongddara` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chorongddara`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: j8c101.p.ssafy.io    Database: chorongddara
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BATCH_JOB_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  `JOB_CONFIGURATION_LOCATION` varchar(2500) DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  KEY `JOB_INST_EXEC_FK` (`JOB_INSTANCE_ID`),
  CONSTRAINT `JOB_INST_EXEC_FK` FOREIGN KEY (`JOB_INSTANCE_ID`) REFERENCES `BATCH_JOB_INSTANCE` (`JOB_INSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION`
--

LOCK TABLES `BATCH_JOB_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION` VALUES (1,2,1,'2023-04-06 01:40:00.050000','2023-04-06 01:40:00.131000','2023-04-06 01:40:00.301000','COMPLETED','COMPLETED','','2023-04-06 01:40:00.302000',NULL),(2,2,2,'2023-04-06 02:00:00.036000','2023-04-06 02:00:00.107000','2023-04-06 02:00:18.453000','FAILED','FAILED','org.springframework.orm.jpa.JpaSystemException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz; nested exception is org.hibernate.id.IdentifierGenerationException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:331)\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:233)\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:551)\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:242)\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:174)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:215)\n	at com.sun.proxy.$Proxy134.save(Unknown Source)\n	at com.ssafy.chorongddara.api.service.QuizServiceImpl.saveQuiz(QuizServiceImpl.java:122)\n	at com.ssafy.chorongddara.config.BatchConfig.lambda$step$0(BatchConfig.java:59)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:407)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:331)\n	at org.springframework.transaction.support.TransactionTemplate.execute(TransactionTemplate.java:140)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$2.doInChunkContext(TaskletStep.java:273)\n	at org.springframework.','2023-04-06 02:00:18.454000',NULL),(3,2,3,'2023-04-06 11:37:00.208000','2023-04-06 11:37:00.390000','2023-04-06 11:37:16.287000','FAILED','FAILED','org.springframework.orm.jpa.JpaSystemException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz; nested exception is org.hibernate.id.IdentifierGenerationException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:331)\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:233)\r\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:551)\r\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\r\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:242)\r\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:174)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:215)\r\n	at com.sun.proxy.$Proxy137.save(Unknown Source)\r\n	at com.ssafy.chorongddara.api.service.QuizServiceImpl.saveQuiz(QuizServiceImpl.java:122)\r\n	at com.ssafy.chorongddara.config.BatchConfig.lambda$step$0(BatchConfig.java:59)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:407)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:331)\r\n	at org.springframework.transaction.support.TransactionTemplate.execute(TransactionTemplate.java:140)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$2.doInChunkContext(TaskletStep.java:273)\r\n	at ','2023-04-06 11:37:16.296000',NULL),(4,2,4,'2023-04-06 11:42:00.241000','2023-04-06 11:42:00.446000','2023-04-06 11:46:42.342000','COMPLETED','COMPLETED','','2023-04-06 11:46:42.353000',NULL),(5,2,5,'2023-04-06 21:00:00.030000','2023-04-06 21:00:00.094000','2023-04-06 21:07:41.803000','COMPLETED','COMPLETED','','2023-04-06 21:07:41.804000',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_CONTEXT` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_CTX_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_JOB_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\"}',NULL),(2,'{\"@class\":\"java.util.HashMap\"}',NULL),(3,'{\"@class\":\"java.util.HashMap\"}',NULL),(4,'{\"@class\":\"java.util.HashMap\"}',NULL),(5,'{\"@class\":\"java.util.HashMap\"}',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_PARAMS`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_PARAMS` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `TYPE_CD` varchar(6) NOT NULL,
  `KEY_NAME` varchar(100) NOT NULL,
  `STRING_VAL` varchar(250) DEFAULT NULL,
  `DATE_VAL` datetime(6) DEFAULT NULL,
  `LONG_VAL` bigint DEFAULT NULL,
  `DOUBLE_VAL` double DEFAULT NULL,
  `IDENTIFYING` char(1) NOT NULL,
  KEY `JOB_EXEC_PARAMS_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_PARAMS_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_PARAMS`
--

LOCK TABLES `BATCH_JOB_EXECUTION_PARAMS` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_PARAMS` VALUES (1,'LONG','time','','1970-01-01 00:00:00.000000',1680745200000,0,'Y'),(2,'LONG','time','','1970-01-01 00:00:00.000000',1680746400001,0,'Y'),(3,'LONG','time','','1970-01-01 09:00:00.000000',1680748620002,0,'Y'),(4,'LONG','time','','1970-01-01 09:00:00.000000',1680748920031,0,'Y'),(5,'LONG','time','','1970-01-01 00:00:00.000000',1680814800000,0,'Y');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_JOB_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_SEQ` VALUES (5,'0');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_INSTANCE`
--

DROP TABLE IF EXISTS `BATCH_JOB_INSTANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_INSTANCE` (
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_NAME` varchar(100) NOT NULL,
  `JOB_KEY` varchar(32) NOT NULL,
  PRIMARY KEY (`JOB_INSTANCE_ID`),
  UNIQUE KEY `JOB_INST_UN` (`JOB_NAME`,`JOB_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_INSTANCE`
--

LOCK TABLES `BATCH_JOB_INSTANCE` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_INSTANCE` VALUES (1,0,'job','a1a65f0f7fdac935e5d27b7434f07d27'),(2,0,'job','09e40ff198bd8c5e1042ab1874071a9c'),(3,0,'job','5f47927289e5aed49fc86a58ada6a354'),(4,0,'job','ff2fa9c2cfcb16075a75766d79bff199'),(5,0,'job','2b876f023db729f9e115742234d94377');
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_SEQ`
--

LOCK TABLES `BATCH_JOB_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_SEQ` VALUES (5,'0');
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint NOT NULL,
  `STEP_NAME` varchar(100) NOT NULL,
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `START_TIME` datetime(6) NOT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `COMMIT_COUNT` bigint DEFAULT NULL,
  `READ_COUNT` bigint DEFAULT NULL,
  `FILTER_COUNT` bigint DEFAULT NULL,
  `WRITE_COUNT` bigint DEFAULT NULL,
  `READ_SKIP_COUNT` bigint DEFAULT NULL,
  `WRITE_SKIP_COUNT` bigint DEFAULT NULL,
  `PROCESS_SKIP_COUNT` bigint DEFAULT NULL,
  `ROLLBACK_COUNT` bigint DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  KEY `JOB_EXEC_STEP_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_STEP_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION`
--

LOCK TABLES `BATCH_STEP_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION` VALUES (1,3,'step',1,'2023-04-06 01:40:00.235000','2023-04-06 01:40:00.285000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-04-06 01:40:00.287000'),(2,2,'step',2,'2023-04-06 02:00:00.154000','2023-04-06 02:00:18.434000','FAILED',0,0,0,0,0,0,0,1,'FAILED','org.springframework.orm.jpa.JpaSystemException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz; nested exception is org.hibernate.id.IdentifierGenerationException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:331)\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:233)\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:551)\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:242)\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:174)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:215)\n	at com.sun.proxy.$Proxy134.save(Unknown Source)\n	at com.ssafy.chorongddara.api.service.QuizServiceImpl.saveQuiz(QuizServiceImpl.java:122)\n	at com.ssafy.chorongddara.config.BatchConfig.lambda$step$0(BatchConfig.java:59)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:407)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:331)\n	at org.springframework.transaction.support.TransactionTemplate.execute(TransactionTemplate.java:140)\n	at org.springframework.batch.core.step.tasklet.TaskletStep$2.doInChunkContext(TaskletStep.java:273)\n	at org.springframework.','2023-04-06 02:00:18.435000'),(3,2,'step',3,'2023-04-06 11:37:00.678000','2023-04-06 11:37:16.194000','FAILED',0,0,0,0,0,0,0,1,'FAILED','org.springframework.orm.jpa.JpaSystemException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz; nested exception is org.hibernate.id.IdentifierGenerationException: ids for this class must be manually assigned before calling save(): com.ssafy.chorongddara.db.entity.Quiz\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.convertHibernateAccessException(HibernateJpaDialect.java:331)\r\n	at org.springframework.orm.jpa.vendor.HibernateJpaDialect.translateExceptionIfPossible(HibernateJpaDialect.java:233)\r\n	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.translateExceptionIfPossible(AbstractEntityManagerFactoryBean.java:551)\r\n	at org.springframework.dao.support.ChainedPersistenceExceptionTranslator.translateExceptionIfPossible(ChainedPersistenceExceptionTranslator.java:61)\r\n	at org.springframework.dao.support.DataAccessUtils.translateIfNecessary(DataAccessUtils.java:242)\r\n	at org.springframework.dao.support.PersistenceExceptionTranslationInterceptor.invoke(PersistenceExceptionTranslationInterceptor.java:152)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.data.jpa.repository.support.CrudMethodMetadataPostProcessor$CrudMethodMetadataPopulatingMethodInterceptor.invoke(CrudMethodMetadataPostProcessor.java:174)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:97)\r\n	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186)\r\n	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:215)\r\n	at com.sun.proxy.$Proxy137.save(Unknown Source)\r\n	at com.ssafy.chorongddara.api.service.QuizServiceImpl.saveQuiz(QuizServiceImpl.java:122)\r\n	at com.ssafy.chorongddara.config.BatchConfig.lambda$step$0(BatchConfig.java:59)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:407)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$ChunkTransactionCallback.doInTransaction(TaskletStep.java:331)\r\n	at org.springframework.transaction.support.TransactionTemplate.execute(TransactionTemplate.java:140)\r\n	at org.springframework.batch.core.step.tasklet.TaskletStep$2.doInChunkContext(TaskletStep.java:273)\r\n	at ','2023-04-06 11:37:16.203000'),(4,3,'step',4,'2023-04-06 11:42:00.750000','2023-04-06 11:46:42.237000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-04-06 11:46:42.247000'),(5,3,'step',5,'2023-04-06 21:00:00.133000','2023-04-06 21:07:41.789000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-04-06 21:07:41.790000');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_CONTEXT` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  CONSTRAINT `STEP_EXEC_CTX_FK` FOREIGN KEY (`STEP_EXECUTION_ID`) REFERENCES `BATCH_STEP_EXECUTION` (`STEP_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_STEP_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.ssafy.chorongddara.config.BatchConfig$$Lambda$1263/0x00000008408f0440\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(2,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.ssafy.chorongddara.config.BatchConfig$$Lambda$1263/0x00000008408f0440\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(3,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.ssafy.chorongddara.config.BatchConfig$$Lambda$1269/0x0000000801279c10\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(4,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.ssafy.chorongddara.config.BatchConfig$$Lambda$1269/0x0000000801279c10\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL),(5,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"com.ssafy.chorongddara.config.BatchConfig$$Lambda$1263/0x00000008408f0840\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL);
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_STEP_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_SEQ` VALUES (5,'0');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cultural_property`
--

DROP TABLE IF EXISTS `cultural_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cultural_property` (
  `cultural_property_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `description` longtext,
  `hidden_description` longtext,
  `image` varchar(255) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `name_ch` varchar(50) DEFAULT NULL,
  `name_ko` varchar(50) NOT NULL,
  `pin_image` varchar(255) DEFAULT NULL,
  `pose_id` int DEFAULT NULL,
  `stage_id` int DEFAULT NULL,
  PRIMARY KEY (`cultural_property_id`),
  KEY `FKaxfnir6vl4mdx4g0u0hxiljgf` (`pose_id`),
  KEY `FKbkss6gx4dyjg8oncfly5ckol4` (`stage_id`),
  CONSTRAINT `FKaxfnir6vl4mdx4g0u0hxiljgf` FOREIGN KEY (`pose_id`) REFERENCES `pose` (`pose_id`),
  CONSTRAINT `FKbkss6gx4dyjg8oncfly5ckol4` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1120 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cultural_property`
--

LOCK TABLES `cultural_property` WRITE;
/*!40000 ALTER TABLE `cultural_property` DISABLE KEYS */;
INSERT INTO `cultural_property` VALUES (1,'광주 동구 지산2동 448-4번지','1963년 보물로 지정되었다. 높이 7.24m. 2층 받침돌 위에 5층의 몸돌과 지붕돌, 머리장식인 상륜부(相輪部)를 올린 모습이다. 아래층 받침돌의 면석에는 모서리 기둥과 2개의 가운데 기둥이 새겨져 있다. 덮개돌은 여러 장의 널돌로 구성되었으며, 약간 경사진 윗면에는 각지고 둥근 굄이 자리하고 있다. 윗층 받침돌의 면석도 여러 장의 널돌로 되어 있고, 각 면에는 모서리 기둥과 2개의 가운데 기둥이 있다. 덮개돌에는 밑면에 쇠시리인 부연(副椽)이 있고, 경사진 윗면에는 몸돌을 받치기 위한 굄을 마련하였다.','탑신부(塔身部)는 몸돌과 지붕돌이 각각 하나의 돌로 되어 있다. 1층 몸돌은 비교적 높은 편이고, 2층 몸돌부터 높이가 줄었지만 대체로 넓이에 비해 높이가 높은 편이다. 각 층의 몸돌에는 모서리 기둥이 새겨졌을 뿐 다른 조각은 없다. 지붕돌은 추녀 밑이 수평인데, 윗면에서는 반전을 보인다. 받침수는 1층이 5단이고 2층 이상은 4단이다. 상륜부에는 노반(露盤)과 바리때 모양의 복발(覆鉢) 등이 남아 있지만 파손이 심한 상태이고, 가운데 부분의 찰주(擦柱)는 일부가 노출되어 있다.','/cultural_property/1_5.jpg',35.14891073,126.9330876,'光州 芝山洞 五層 石塔','광주 지산동 오층석탑','/pin/1_5.png',1,1),(2,'광주 서구 유촌동 497번지','광주광역시 서구 유촌동에 있는 불상으로 원래 쌍촌동 운천사에 있던 것으로 1939년 지금의 위치로 옮겨 왔다. 신체는 당당한 어깨에 비해 팔이 짧고 허리가 가늘어 움츠려진 듯한 인상을 준다. 무릎은 지나치게 과장되게 표현되었으며, 다리와 대칭을 이루고 있는 양쪽 발바닥, 옷자락은 특이한 모습을 보여주고 있다. 이러한 신체 모습은 고려시대 양식을 계승하고 있는 조선 전기 불상의 특징으로 불교 조각 분야에서 귀중한 자료로 평가되고 있다.','전하는 이야기에 의하면 당시 극락면이었던 유촌동은 사람의 왕래가 많고 주민들도 많이 살았는데 마땅히 소원을 빌 만한 대상이 없어 운천사에 있던 불상을 지금의 위치로 옮겼다고 한다.','/cultural_property/1_4.jpg',35.1651012,126.8518525,'楡村洞石造如來坐像','유촌동석조여래좌상','/pin/1_4.png',1,1),(3,'광주 북구 금곡동 209-13번지','1710년(숙종 36) 제작. 1989년 광주광역시 유형문화재로 지정되었다. 높이 86cm. 이 종은 전라남도를 중심으로 18세기 초반부터 많은 수의 범종을 제작한 사장(私匠) 김성원(金成元)이 옥천사종(玉泉寺鐘)보다 2년 뒤인 1710년에 만든 종이다. 명문에 따르면, 원래는 담양 추월산(秋月山)의 만수사종(萬壽寺鐘)으로 만들어진 것이다. 이 종은 몸체 높이와 입 지름의 비율이 거의 1:1로 전형적인 조선종의 비율을 지니고 있으나, 용뉴 부위의 표현이 경직되고 음통대신 음구멍을 넣는 등 양식의 퇴화가 엿 보인다. 또 당좌 및 하대의 문양이 없어지는 등 조선후기 범종의 특징이 나타나는 점에서, 범종의 양식 변화를 연구하는데 중요한 자료가 된다.','김성원은 실상사종(實相寺鐘, 1694년)을 제작한 김상립(金尙立)의 아들로서 선암사종루종(仙巖寺鐘樓鐘, 1700년)까지는 형제들과 함께 제작에 참여하나 옥천사종부터 독립된 수장(首匠)으로 활동하게 된다.','/cultural_property/1_6.jpg',35.1692658,126.997392,'元曉寺所藏萬壽寺梵鍾','원효사 소장 만수사 범종','/pin/1_6.png',1,1),(4,'광주 서구 용두학동길 15 (용두동)','지석묘는 청동기시대의 대표적인 무덤으로 고인돌이라고도 부르며, 주로 경제력이 있거나 정치권력을 가진 지배층의 무덤으로 알려져 있다.','10개의 고인돌 중에는 전라남도 지방에서는 보기 드문 탁자식 고인돌이 1기 있고, 나머지는 바둑판식이다. 탁자식 고인돌의 덮개돌은 길이 1.5m, 너비 0.65m이며, 3개의 받침돌이 지탱하고 있다. 이들 고인돌의 덮개돌은 이곳에서 1㎞ 떨어진 송악산에서 가져온 것으로 보인다. 광주 지역에서는 모두 103기의 고인돌이 발견되었는데, 이곳에서는 탁자식 고인돌 1기가 발견된 것이 특징적이다.','/cultural_property/1_3.jpg',35.09877561,126.8258313,'龍頭洞支石墓','용두동지석묘','/pin/1_3.png',1,1),(5,'광주 광산구 비아안길 19 (비아동)','유허비란 옛 선현의 자취를 기념하고자 세우는 비이다. 이 비는 취병 조형(1606∼1679) 선생을 기리기 위하여 세워놓은 것으로, 선생이 태어난 옛 터에 자리잡고 있다.','비는 아래에 받침돌을 마련하고, 비몸과 지붕돌을 하나의 돌로 조각하여 그 위에 세웠다. 높이보다 너비가 넓은 특이한 모습이며, 지붕돌의 처마가 위를 떠받들 듯 한껏 들려있다.','/cultural_property/1_2.jpg',35.22070823,126.8171761,'翠屛趙珩遺墟碑','취병조형유허비','/pin/1_2.png',1,1),(6,'광주 광산구 삼거동 산50번지 외','지석묘는 청동기시대의 대표적인 무덤으로 고인돌이라고도 부르며, 주로 경제력이 있거나 정치권력을 가진 지배층의 무덤으로 알려져 있다.','23기로 이루어진 한 무리의 고인돌은 동서로 위치하고 있는데, 2기만 덮개돌이 1∼1.3m로 두껍고 나머지는 얇은 편이다. 또 다른 한 무리는 북두칠성 모양으로 모여 있는데 크기는 모두 작은 편이다. 이곳에는 돌을 구할 수 있는 장소가 없기 때문에 외부에서 운반하여 고인돌을 만든 것으로 보이고, 칠성마을이라는 이름은 고인돌이 놓인 형태에서 따온 것 같다.','/cultural_property/1_1.jpg',35.15287646,126.6735459,'三巨洞고인돌群','삼거동고인돌군','/pin/1_1.png',1,1),(7,'대구 달성군 용연사길 260 (옥포읍, 용연사)','비슬산 용연사는 통일신라 신덕왕 원년(912)에 보양국사가 처음 지었다고 전한다. 조선 세종 1년(1419)에 천일대사가 다시 지었고, 임진왜란으로 불탄 것을 여러 해에 걸쳐 다시 지었다. 이렇게 지어진 건물은 200여 칸이 넘고 승려도 500여 명이나 되는 큰 절이었다고 한다.','아미타불을 모신 극락전은 영조 4년(1728)에 다시 지었다. 앞면 3칸·옆면 3칸의 규모이며, 지붕 옆면이 사람 인(人)자 모양인 간결한 맞배지붕집이다. 지붕처마를 받치면서 장식을 겸하는 공포는 기둥 위와 기둥 사이에도 배치된 다포 양식으로 조선 후기 건축 양식을 잘 보존하고 있는 건물이다.','/cultural_property/2_1.jpg',35.74780608,128.5196942,'龍淵寺極樂殿','용연사 극락전','/pin/2_1.png',1,2),(8,'대구광역시 달성군 유가읍 용리 산 1','대구에 있는 비슬산(琵瑟山) 일원에는 신라시대 이래의 많은 불교 유적이 산재해 있는데 용봉동 석불입상이 있는 곳도 그 중의 하나이다. 높이 2.8m의 화강암을 이용하여 한쪽면에 광배(光背)와 불상을 조각한 것으로 왼손에 약항아리를 들고 있어 약사불을 형상화한 것임을 알 수 있다.','민머리에 상투 모양의 머리묶음이 큼직하게 솟아 있으며, 얼굴에는 풍만한 인상이 나타나 있다. 부처의 몸에서 나오는 빛을 형상화한 광배는 배(舟)모양으로 원형의 머리광배와 가는 타원형의 몸광배를 도드라진 선으로 나타내고 있다. 불상과 광배에 표현된 조각기법은 통일신라 후기의 수법을 계승한 것으로 보인다.','/cultural_property/2_2.jpg',35.68903,128.526188,'達城 龍鳳洞 石佛立像','달성 용봉동 석불입상','/pin/2_2.png',1,2),(9,'대구 동구 용수동 산1-3번지','대구 팔공산 중앙봉의 정상에 위치하고 있는 전체 높이 6m에 달하는 거대한 석불입상이다.','옷자락 밖으로 노출된 발끝은 발가락의 조각이 뚜렷하여 거대한 불상임에도 안정감을 준다.','/cultural_property/2_3.jpg',35.999058,128.6597,'八公山東峰石造藥師如來立像','팔공산동봉석조약사여래입상','/pin/2_3.png',1,2),(10,'대구 동구 팔공산로201길 41, 동화사 (도학동)','동화사 서쪽 언덕에 자리잡은 비로암의 대적광전 앞뜰에 세워져 있는 3층석탑으로, 2단의 기단(基壇) 위에 3층의 탑신(塔身)을 세운 모습이다.','각 기단 위에 괴임을 여러 개 둔다거나, 지붕돌 네 귀퉁이의 들린 정도가 크지 않은 점 등에서 통일신라 후기의 석탑양식을 따르고 있는 단정하고 아름다운 작품이다.','/cultural_property/2_4.jpg',35.991914,128.702764,'大邱 桐華寺 毘盧庵 三層石塔','대구 동화사 비로암 삼층석탑','/pin/2_4.png',1,2),(11,'서울 은평구 역촌동 8-12번지','이 석비는 조선왕조 제16대 임금 인조(仁祖, 1623~1649)가 반정(反正)으로 왕위에 오르기 전에 머물렀던 별서(別墅)를 기념하고자 숙종 21년(1695)에 세운 것으로 인조반정에 관련된 중요한 역사적 사실과 그 현장을 증명해 주는 사료로써 가치가 있다. 표제는 조선 19대 숙종(肅宗)의 어필(御筆)로 ?인조대왕용잠지시별서유기비(仁祖大王龍潛之時別墅遺基碑)?라고 쓰고 뒷면 음기(陰記)는 숙종의 어제(御製)를 동평군(東平君) 이항(李杭)이 쓰고 있어 가치를 더해준다.','석비의 조형적 측면에서도 거북받침돌은 중국의 영향을 받아 새롭게 등장한 조선시대 초기양식의 전통을 잇고 있는 동시에 지붕돌은 이수 대신 간결한 한옥양식으로 변화된 후기 석비양식의 특징을 완벽하게 보여주고 있어 조선시대 석비예술의 흐름을 파악하는 데도 귀중한 자료가 되고 있다.','/cultural_property/3_1.jpg',37.60872881,126.9166196,'서울 仁祖別墅 遺基碑','서울 인조별서 유기비','/pin/3_1.png',1,3),(12,'서울 종로구 사직로 161 (세종로, 경복궁)','경복궁 근정전 서북쪽 연못 안에 세운 경회루는, 나라에 경사가 있거나 사신이 왔을 때 연회를 베풀던 곳이다. 경복궁을 처음 지을 때의 경회루는 작은 규모였으나, 조선 태종 12년(1412)에 연못을 넓히면서 크게 다시 지었다. 그 후 임진왜란으로 불에 타 돌기둥만 남은 상태로 유지되어 오다가 270여 년이 지난 고종 4년(1867) 경복궁을 다시 지으면서 경회루도 다시 지었다. 연못 속에 잘 다듬은 긴 돌로 둑을 쌓아 네모 반듯한 섬을 만들고 그 안에 누각을 세웠으며, 돌다리 3개를 놓아 땅과 연결되도록 하였다. 경복궁 경회루는 우리 나라에서 단일 평면으로는 규모가 가장 큰 누각으로, 간결하면서도 호화롭게 장식한 조선 후기 누각건축의 특징을 잘 나타내고 있는 소중한 건축 문화재이다.','앞면 7칸·옆면 5칸의 2층 건물로, 지붕은 옆면에서 볼 때 여덟 팔(八)자 모양을 한 팔작지붕이다. 지붕 처마를 받치기 위해 장식하여 만든 공포는 누각건물에서 많이 보이는 간결한 형태로 꾸몄다. 태종 때 처음 지어진 경회루는 성종 때 고쳐지으면서 누각의 돌기둥을 화려하게 용의 문양을 조각하였다고 전해지나, 임진왜란으로 소실된 이후 고종대에 다시 지으면서 지금과 같이 간결하게 바깥쪽에는 네모난 기둥을, 안쪽에는 둥근기둥을 세웠다. 1층 바닥에는 네모난 벽돌을 깔고 2층 바닥은 마루를 깔았는데, 마루의 높이를 3단으로 각각 달리하여 지위에 따라 맞는 자리에 앉도록 하였다.','/cultural_property/3_2.jpg',37.579201,126.975569,'景福宮 慶會樓','경복궁 경회루','/pin/3_2.png',1,3),(13,'서울 동대문구 회기로 56-','‘서울 세종 영릉 신도비(서울 世宗英陵神道碑)’는 1452년(문종 2)에 세운 것이다. 세종 영릉 신도비는 조선시대 문화의 기틀을 마련하고 국기를 튼튼히 다졌던 제4대 임금 세종의 생애와 업적을 영원히 기리기 위해 그의 일대기를 담아 세운 비이다.','세종의 훈민정음 창제에 크게 공헌했던 문신 정인지(鄭麟趾, 1396~1478년)가 글을 짓고, 세종대왕의 셋째 아들로 당대의 대표적 서예가였던 안평대군 이용(李瑢, 1418~1453년)이 글씨를 썼다. 비록 비신의 표면이 심하게 부식·박락되어 금석문의 내용을 거의 알아볼 수 없는 상태이지만 “···겸성균관대사성 신 정인(兼成均館大司成臣鄭麟)···”과 “···신 용 봉교서(臣瑢奉敎書)···”와 같은 중요한 부분이 남아 있는 것만으로도 가치가 높다고 할 수 있다. 또한 비신과 한 몸으로 제작된 이수(?首)는 원형을 거의 간직하고 있어, 조선 초기 왕의 신도비를 비롯하여 조선시대에 세워진 많은 신도비를 연구하는 데 중요한 자료가 될 수 있다.','/cultural_property/3_3.jpg',37.590032,127.043238,'서울 世宗 英陵 神道碑','서울 세종 영릉 신도비','/pin/3_3.png',1,3),(14,'서울 강남구 삼성동 73 봉은사','봉은사는 고려시대 견성사로 불리웠으며, 조선 연산군 4년(1498) 정현왕후가 성종(재위 1469∼1494)의 릉인 선릉의 원찰로 견성사를 중창하면서 이름을 봉은사로 고쳤다. 조선 최대의 명찰 중에 하나였고 불교 중흥의 역할이 컸으나 임진왜란 등 전란으로 불타 몇 차례 중건 및 중수된 바 있다. 현재 문화재로 지정된 봉은사 선불당도 1939년에 화재로 전소된 것을 1941년에 중건한 것으로 대중들이 참선하는 선방이다. 명종 7년에 봉은사에서 스님이 되기 위해 치러야하는 시험인 승과를 실시하였다는 기록이 확인되고 있어 선불당이라는 이름이 붙게 되었다.','심검당이 있던 자리에 중건된 이 선불단은 정면8칸, 측면 3칸 규모의 단층 목조 기와집으로 초익공 양식을 이루고 있으나 내부의 실제구조는 정면5칸으로 되어 있어 특이하다. 동서로 4칸, 남북으로 3칸 규모인 큰방을 중심으로 내부 삼면이 방으로 둘러 있는 모양새를 하고 있으며 지붕 옆면이 여덟 팔(八)자 모양인 팔작지붕집이다．지은 연대가 오래되지 않았고，내부의 천장과 뒷편이 수리되면서 조금 변형이 되었으나 서울 시내에 이와 같은 양식과 규모를 가진 유례가 드문 귀중한 목조건물로 평가 된다.','/cultural_property/3_4.jpg',37.51550933,127.0577051,'奉恩寺 選佛堂','봉은사 선불당','/pin/3_4.png',1,3),(1111,'ssafy','asdsdasa','sadsaas','asdsad',35.20351,126.80893,'asdas','ㅎㅇ','/pin/3_4.png',1,1);
/*!40000 ALTER TABLE `cultural_property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `gallery_id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) DEFAULT NULL,
  `cultural_property_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`gallery_id`),
  KEY `FKjhxe2jphryqypvo6laowidnnd` (`cultural_property_id`),
  KEY `FKon6nw0r7lj61c6vxsxw1srbmn` (`user_id`),
  CONSTRAINT `FKjhxe2jphryqypvo6laowidnnd` FOREIGN KEY (`cultural_property_id`) REFERENCES `cultural_property` (`cultural_property_id`),
  CONSTRAINT `FKon6nw0r7lj61c6vxsxw1srbmn` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (18,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F70b2cd22-1606-45cb-99b6-dc0b35fd77da?alt=media&token=18f2f9a3-9728-4ef0-bf08-0ff89ae1dcc7',1111,8),(19,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F4963e0b1-6b05-4c17-b163-1bfa1ae03396?alt=media&token=1db89a06-4ccb-458e-8987-282f5fb43008',1111,8),(20,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F17a63182-9789-4d4e-8066-acda5ef9030f?alt=media&token=8443bccb-4106-4e8c-897e-c688b3b1dbdb',1111,8),(21,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F1f3f8bfe-7138-47f4-8d08-2b4201491773?alt=media&token=e43f84ba-78d9-4a4c-b155-d2a19b3e8499',1111,8),(22,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fe3b91257-eaf5-4c47-ac42-4a465c1d7112?alt=media&token=6eb2a8c8-3ece-430d-b531-91bd4e72c0de',1111,8),(23,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F104300ef-8fde-4bb9-9a3e-a404a3f9e20a?alt=media&token=0c79f8a8-db08-42fa-a84b-73d6e3f3e048',1111,8),(24,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F5ae90963-5b27-4a7a-8a59-37a553c8d909?alt=media&token=47c9e6e5-ddb7-4808-845f-3ea74ddd51df',1111,8),(25,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fb7713d25-7ebb-428d-8b7d-56c68343cc27?alt=media&token=5107af82-4b72-420a-9b57-4519d2a9da18',1111,8),(26,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fa32c5173-3ef9-4c31-9b7b-2e37968d24d7?alt=media&token=71c222a4-d516-41e6-bab7-4bec67a0240b',1111,8),(27,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F7105b128-63f2-4231-84f2-b6a9834fa5ad?alt=media&token=34d36481-a321-4c5b-8d5b-fb161d2f061e',1111,8),(28,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F52bec8db-17bf-48af-b17d-794edd3716c3?alt=media&token=0c0847bb-f510-4a40-b12a-9d062c06f83e',1111,8),(29,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fb0a17faa-bc83-49d9-b4d2-fdf871e09a28?alt=media&token=559d02cb-236f-4d10-af1a-587ce61a1610',1111,8),(30,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fa806d6ed-bf17-433e-9125-1b633b3a7ca2?alt=media&token=edd4ba8a-3067-43dc-9089-deb5e79c0c4f',1111,8),(31,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F9c512c7d-e273-4687-8273-906befeefe49?alt=media&token=52a85e6f-2cfa-4151-b16c-ac26215c41f7',1111,8),(32,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F82b6d96e-a071-4f23-a388-66c5b54b61dc?alt=media&token=2b34b6fd-6887-418e-b275-8ad2609a4ec5',1111,8),(33,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F6635a9e8-1164-413e-b72a-6713526fd3e1?alt=media&token=8a898d3a-8bc9-4f24-b411-b657eaf3ad4e',1111,8),(34,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fbb6e2130-324e-445d-9395-98e1bfe1e3d0?alt=media&token=b0f9aaf7-6a42-4055-b560-7b2a302c710b',1111,8),(35,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F57bcecaf-ff6d-4f7e-9ee4-92204df5fff6?alt=media&token=71285b06-6f80-4fe7-8464-4b244039782b',1111,8),(36,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F1c76b5f0-ee7a-404d-9c17-59d22c4223fc?alt=media&token=c4edb6ab-f412-49ae-ac22-0bf5f12511fc',1111,8),(37,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F34a3f69d-9b08-420b-a1da-25ed2ab7039e?alt=media&token=47b4241a-95eb-4210-ac60-368a70911e53',1111,8),(38,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fcff71343-4774-4b40-b63b-ef27f0602d52?alt=media&token=908c547d-f87b-47e7-a100-96f5eb8dbd80',1111,8),(39,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F61c94d93-904f-4811-b2c9-2ace75c31c97?alt=media&token=20c86024-fdb7-42c0-abd2-93dc84cf113f',1111,8),(40,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2Fda0a0150-38b1-47fb-89cd-1599c6a30266?alt=media&token=84e058d6-0db8-439d-b059-b25e14bc69a5',1111,8),(41,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F09975dee-1371-4cf8-872d-003e6e5a6f06?alt=media&token=ff9f617e-75d0-4272-b54d-8a2f404e7981',1111,8),(42,'https://firebasestorage.googleapis.com/v0/b/ssafy-vip.appspot.com/o/files%2F3775e3fd-edb5-4793-abae-7e8c4a819e88?alt=media&token=e83712b2-bec0-4618-9d83-d8235f9c30e4',1111,8);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pose`
--

DROP TABLE IF EXISTS `pose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pose` (
  `pose_id` int NOT NULL AUTO_INCREMENT,
  `pose_name` varchar(50) NOT NULL,
  `pose_picture` varchar(255) NOT NULL,
  PRIMARY KEY (`pose_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pose`
--

LOCK TABLES `pose` WRITE;
/*!40000 ALTER TABLE `pose` DISABLE KEYS */;
INSERT INTO `pose` VALUES (1,'alton','/pose/pose_mansae.png'),(2,'pray','/pose/pose_crouch.png'),(3,'defualt','/pose/pose_oops.png');
/*!40000 ALTER TABLE `pose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` bigint NOT NULL AUTO_INCREMENT,
  `cultural_property_id` int NOT NULL,
  `question` varchar(50) DEFAULT NULL,
  `option_one` varchar(100) DEFAULT NULL,
  `option_two` varchar(100) DEFAULT NULL,
  `option_three` varchar(100) DEFAULT NULL,
  `option_four` varchar(100) DEFAULT NULL,
  `answer` varchar(100) DEFAULT NULL,
  `explaination` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `fk_quiz_cultural_property_idx` (`cultural_property_id`),
  CONSTRAINT `fk_quiz_cultural_property` FOREIGN KEY (`cultural_property_id`) REFERENCES `cultural_property` (`cultural_property_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (46,1,'광주 지산동 오층석탑은 언제 건립되었나?','7세기','8세기','9세기','10세기','7세기','광주 지산동 오층석탑은 7세기 경주 석굴암의 영정을 모방하여 건립된 것으로 추정되며, 실제 건립한 사람은 알려져 있지 않습니다.'),(47,1,'광주 지산동 오층석탑의 높이는 얼마인가?','5m','7m','10m','13m','7m','광주 지산동 오층석탑의 높이는 7m이며, 기단을 포함한 전체 높이는 약 20m입니다.'),(48,1,'광주 지산동 오층석탑에 사용된 돌의 종류는 무엇인가?','화강암','석회암','조각암','석옥','화강암','광주 지산동 오층석탑의 전체 구조물은 문양이 새긴 불굴비례, 중층은 신라시대 건축양식의 모습을 보여주고 있으며, 가장 높은 오층은 귀뚜라미모양이며 구조는 부분적으로 축소된 육각탑양식입니다. 이 구조물에는 대부분 화강암이 사용되어 단단하게 지어졌습니다.'),(49,2,'유촌동석조여래좌상은 몇 대인가?','1','2','3','4','2','유촌동석조여래좌상은 2개의 여래좌상으로 이루어져 있습니다.'),(50,2,'유촌동석조여래좌상은 언제 만들어졌나?','고려시대','조선시대','근대','현대','고려시대','유촌동석조여래좌상은 고려시대인 1251년에 만들어졌습니다.'),(51,2,'유촌동석조여래좌상은 어떤 재료로 만들어졌나?','나무','종이','석조','철재','석조','유촌동석조여래좌상은 석조로 만들어졌습니다.'),(52,3,'만수사는 어떤 종교의 사찰인가?','불교','기독교','천주교','이슬람교','불교','만수사는 대한불교조계종 사찰로, 불교 종교와 관련된 사찰입니다.'),(53,3,'만수사의 건립 연도는 언제인가?','654년','754년','854년','954년','754년','만수사는 고려시대 공덕왕릉을 모시고 세워진 사찰로, 754년에 건립되었습니다.'),(54,3,'만수사의 명칭은 어떤 의미를 가지고 있는가?','만유','만복','만인','만남','만복','만수사는 \'만복(萬福)사\'로, 선조들의 복을 빕니다. 또한, 삼국시대부터 거쳐온 \'만여사(萬如寺)\'에서 유래되어 \'만\'은 무궁한 권세와 부귀를 뜻하고, \'수\'는 숙고하는 것과 분별하는 뜻을 가지고 있습니다.'),(55,4,'용두동지석묘는 몇 개의 돌박지와 함께 있는 고분인가?','1개','2개','3개','4개','3개','용두동지석묘는 3개의 돌박지와 함께 있는 고분입니다.'),(56,4,'용두동지석묘는 몇세기에 건립된 건물인가?','5세기','6세기','7세기','8세기','7세기','용두동지석묘는 7세기에 건립된 건물입니다.'),(57,4,'용두동지석묘는 어떤 형태의 돌로 이루어져 있는가?','사각형 돌','동그란 돌','삼각형 돌','다각형 돌','다각형 돌','용두동지석묘는 다각형 돌로 이루어져 있습니다.'),(58,5,'취병조형유허비는 몇 기간에 걸쳐 제작되었는가?','A. 3기간','B. 4기간','C. 5기간','D. 6기간','C','취병조형유허비는 5기간에 걸쳐 제작되었습니다.'),(59,5,'취병조형유허비는 무엇을 상징하는가?','A. 악취','B. 방귀','C. 포장마차','D. 술잔','D','취병조형유허비는 술잔을 상징합니다.'),(60,5,'취병조형유허비는 어디에 위치하고 있는가?','A. 광주 서구 치평동','B. 광주 남구 백운동','C. 광주 광산구 비아동','D. 광주 동구 서남동','C','취병조형유허비는 광주 광산구 비아동에 위치해 있습니다.'),(61,6,'삼거동고인돌군이 위치한 지역은?','광주 남구','광주 동구','광주 서구','광주 광산구','광주 광산구','삼거동고인돌군은 광주 광산구 삼거동 산50번지에 위치해 있습니다.'),(62,6,'삼거동고인돌군은 몇 개의 돌로 이루어져 있나?','4','5','6','7','5','삼거동고인돌군은 5개의 돌로 이루어져 있습니다.'),(63,6,'삼거동고인돌군은 전국에서 몇 번째 고인돌군인가?','1번째','2번째','3번째','4번째','2번째','삼거동고인돌군은 전국에서 2번째로 발견된 고인돌군입니다.'),(64,7,'용연사 극락전은 몇 년도에 지어졌을까?','623년','893년','1073년','1173년','1073년','용연사 극락전은 고려 성종 27년(1073년)에 지어졌다.'),(65,7,'용연사 극락전은 몇 층으로 이루어져 있을까?','3층','5층','7층','9층','5층','용연사 극락전은 지하 1층과 지상 5층으로 이루어져 있다.'),(66,7,'용연사 극락전의 기둥은 몇 개일까?','16개','20개','24개','28개','24개','용연사 극락전의 기둥은 총 24개로, 1층부터 5층까지 각각 4개의 기둥이 있다.'),(67,8,'달성 용봉동 석불입상은 몇 개의 석조물로 구성되어 있나?','4','5','6','7','4','달성 용봉동 석불입상은 4개의 석조물로 구성되어 있습니다.'),(68,8,'달성 용봉동 석불입상은 몇 대의 사찰에 속한 것인가?','1','2','3','4','3','달성 용봉동 석불입상은 3대의 사찰(불무사, 용봉사, 대승사)에 속한 것입니다.'),(69,8,'달성 용봉동 석불입상은 언제 만들어진 것인가?','고려','신라','조선','삼국시대','고려','달성 용봉동 석불입상은 고려시대에 만들어진 것으로 추정됩니다.'),(70,9,'팔공산동봉석조약사여래입상은 어느 시기에 만들어졌는가?','신라시대','고려시대','조선시대','근대','고려시대','팔공산동봉석조약사여래입상은 고려시대에 만들어졌습니다.'),(71,9,'팔공산동봉석조약사여래입상은 어떤 재료로 만들어졌는가?','청자','백자','요로쇠','석조','석조','팔공산동봉석조약사여래입상은 석조로 만들어졌습니다.'),(72,9,'팔공산동봉석조약사여래입상의 높이는 얼마인가?','1m','2m','3m','4m','3m','팔공산동봉석조약사여래입상의 높이는 3m입니다.'),(73,10,'대구 동화사 비로암 삼층석탑은 몇층으로 구성되어 있는가?','1층','2층','3층','4층','3층','비로암 삼층석탑은 이름 그대로 3층으로 구성되어 있습니다.'),(74,10,'대구 동화사 비로암 삼층석탑이 지어진 시기는 언제인가?','고려시대','신라시대','조선시대','백제시대','고려시대','대구 동화사 비로암 삼층석탑은 1347년(고려 후기)에 지어졌습니다.'),(75,10,'대구 동화사 비로암 삼층석탑의 높이는 얼마인가?','13미터','15미터','17미터','19미터','15미터','대구 동화사 비로암 삼층석탑의 높이는 정확히 14.7미터입니다.'),(76,11,'서울 인조별서 유기비는 어떤 재료로 만들어졌는가?','청자','동','서리돌','유기질','서리돌','서울 인조별서 유기비는 서리돌로 만들어졌습니다.'),(77,11,'서울 인조별서 유기비는 어떤 역사적인 시대에 만들어졌는가?','고려시대','조선시대','한국전쟁 이후','현대시대','조선시대','서울 인조별서 유기비는 조선시대에 만들어졌습니다.'),(78,11,'서울 인조별서 유기비는 어떤 형태인가?','평면형','원기둥형','단층식','복층식','평면형','서울 인조별서 유기비는 평면형으로서 중앙에는 유기의 상태를 나타내는 조가 새겨져 있습니다.'),(79,12,'경복궁 경회루는 어떤 건축 양식으로 지어졌나요?','서양식','중국식','한국식','일본식','한국식','경회루는 조선시대 건축 양식 중 하나인 \'예조경량식\'으로 지어졌습니다.'),(80,12,'경복궁 경회루는 어떤 역할을 했나요?','관저','회관','전당','아카데미','회관','경회루는 왕과 군신들이 모여 회의하거나 음악과 무용, 문예 등을 즐기는 곳으로 사용되었습니다.'),(81,12,'경복궁 경회루 내부에 있는 역사유물로는 무엇이 있나요?','예단','장식문','국화문','해인사','국화문','경복궁 경회루 내부에는 \'국화문\'이 있다. 이는 조선시대 고창 화순지역에서 유래된 그림으로, 한양으로 가져와 경회루 내부에 걸려있다.'),(82,13,'서울 세종 영릉 신도비의 높이는 얼마인가?','2m','4m','6m','8m','4m','서울 세종 영릉 신도비의 높이는 4m입니다.'),(83,13,'서울 세종 영릉 신도비가 있는 장소는 어디인가?','종로구','용산구','중구','동대문구','동대문구','서울 세종 영릉 신도비는 동대문구 회기로 56-2에 위치해 있습니다.'),(84,13,'서울 세종 영릉 신도비는 언제 건립되었는가?','1397년','1400년','1403년','1406년','1397년','서울 세종 영릉 신도비는 조선 세종 때인 1397년에 건립되었습니다.'),(85,14,'봉은사 선불당은 무엇을 뜻하는가?','미리 물건을 사놓는다는 뜻','미리 충분한 준비를 한다는 뜻','미리 기원을 세운다는 뜻','미리 축복을 받는다는 뜻','미리 충분한 준비를 한다는 뜻','선불당은 수행자들이 운영하는 의식공간으로, 불과 제사 제물을 모셔두며 수행과 함께 음식과 술을 나누고 대화를 나누는 존중의 공간입니다. 행사 전 미리 충분한 준비를 함으로써 불을 마음 속에 불러 일으키고 성스러운 분위기를 조성합니다.'),(86,14,'봉은사 선불당이 위치한 건물은 어떤 역사를 가지고 있는가?','고려 시대에 건립된 불국사지사(佛國寺址寺)','조선 시대에 건립된 조계사 본관','신라 시대에 건립된 황룡사지 다보탑','광화문광장 건립을 기념하기 위해 건립된 덕수궁','고려 시대에 건립된 불국사지사(佛國寺址寺)','봉은사가 옛 이름인 ‘불국사지사(佛國寺址寺)’란 이름의 절터임을 되살리며, 이곳에서 해외문화교류나 해외초청공연 등의 다양한 문화행사와 동시에 커뮤니케이션 공간으로 운영됩니다.'),(87,14,'봉은사 선불당에서는 어떠한 문화행사가 열리는가?','전통예술 공연','힙합 공연','팝 음악 공연','기독교 예배','전통예술 공연','봉은사 선불당에서는 매주 수요일, 일요일마다 전통예술 흥미 유발 수업을 진행하며, 이를 통해 전통문화와 명상정신을 함께 느낄 수 있습니다.'),(88,1111,'경주첨성대는 몇년경에 지어졌는가?','728년','717년','739년','762년','728년','경주첨성대는 고려시대 고덕왕 33년(728년)에 지어졌습니다.'),(89,1111,'범어사지탑은 몇층으로 이루어져있는가?','3층','5층','7층','9층','7층','범어사지탑은 7층의 형태를 띠고 있습니다.'),(90,1111,'창덕궁의 건축 양식은 무엇인가?','조선양식','베트남양식','일본양식','멕시코양식','조선양식','창덕궁은 조선시대의 왕들이 1400년 경에 축조한 조선유교정치의 영향을 받은 조선양식으로 건축되었습니다.');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stage` (
  `stage_id` int NOT NULL AUTO_INCREMENT,
  `character_image` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `stage_image` varchar(255) NOT NULL,
  `stage_name` varchar(255) NOT NULL,
  `target_star_count` int DEFAULT NULL,
  PRIMARY KEY (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (1,'무등몬','광주의 통일신라시대 석탑 문화재들을 찾는 여행입니다.','/stage/1.jpg','광주 석탑의 길',18),(2,'대구대구','대구의 불교 문화재들을 찾는 여행입니다.','/stage/2.jpg','대구 도승의 길',12),(3,'장영실','서울의 조선시대 왕의 거취를 따라가는 여행입니다.','/stage/3.jpg','서울 왕가의 길',12);
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `star`
--

DROP TABLE IF EXISTS `star`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `star` (
  `star_id` int NOT NULL AUTO_INCREMENT,
  `star_ar` int DEFAULT NULL,
  `star_pose` int DEFAULT NULL,
  `star_quiz` int DEFAULT NULL,
  `cultural_property_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`star_id`),
  KEY `FK2vj4p6maagli9ov5js9mwmrrv` (`cultural_property_id`),
  KEY `FK97y8f7vuv50psp9e4hef2e6vg` (`user_id`),
  CONSTRAINT `FK2vj4p6maagli9ov5js9mwmrrv` FOREIGN KEY (`cultural_property_id`) REFERENCES `cultural_property` (`cultural_property_id`),
  CONSTRAINT `FK97y8f7vuv50psp9e4hef2e6vg` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `star`
--

LOCK TABLES `star` WRITE;
/*!40000 ALTER TABLE `star` DISABLE KEYS */;
INSERT INTO `star` VALUES (7,1,1,1,2,8),(8,1,1,1,3,8),(9,1,1,1,4,8),(10,1,1,1,5,8),(11,1,1,1,6,8),(12,1,1,1,7,8),(13,1,1,1,8,8),(14,1,1,1,9,8),(15,1,1,1,10,8),(16,1,1,1,11,8),(17,1,1,1,12,8),(18,1,1,1,13,8),(19,1,1,1,14,8),(20,1,1,1,1111,8),(22,0,0,1,1,8);
/*!40000 ALTER TABLE `star` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'ssafy@ssafy.com','싸피인','$2a$10$fnpfpwxnoRolOV2RUk8TrOlD9mfpdpI7iavJmo.3IAqd5w4SBTsC6'),(8,'test@test.com','VIP','$2a$10$sf5sG76iaXlvmiiChqg9TeB6ASzGT9Fkpu7XJmNLAUTFWNDuKkb2G'),(12,'qorwldnjs100@naver.com','백지원','b811f232-3f15-4b91-9f81-c1f2f3dc7134'),(13,'coco1622@naver.com','양동민','5a8d9679-5cab-403f-b3b8-994ba9512f30'),(14,'asdf@asdf.com','asdf','$2a$10$D/9arQk9id0jI7v7Spf6ouodE4bWUIVTAGwn5AqzRITdld6JeUrqy');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_stage`
--

DROP TABLE IF EXISTS `user_stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_stage` (
  `user_stage_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `stage_id` int DEFAULT NULL,
  `star_count` int DEFAULT NULL,
  PRIMARY KEY (`user_stage_id`),
  KEY `FKlqmn9gxt1vvs12cdxrhlhup5f` (`stage_id`),
  KEY `FK2kxo7tbb799x873odhwu827cl_idx` (`user_id`),
  CONSTRAINT `FK2kxo7tbb799x873odhwu827cl` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKlqmn9gxt1vvs12cdxrhlhup5f` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`stage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_stage`
--

LOCK TABLES `user_stage` WRITE;
/*!40000 ALTER TABLE `user_stage` DISABLE KEYS */;
INSERT INTO `user_stage` VALUES (6,8,1,17),(7,8,2,12),(8,8,3,12);
/*!40000 ALTER TABLE `user_stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'chorongddara'
--

--
-- Dumping routines for database 'chorongddara'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 10:51:00
