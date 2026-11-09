import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
}

android {
    namespace = "pe.carevalojesus.bingoshow"
    compileSdk = 37

    defaultConfig {
        applicationId = "pe.carevalojesus.bingoshow"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        // Servidor de Bingo Show (el mismo que usa la web)
        // Para probar contra wrangler dev: ./gradlew … -Pservidor=http://10.0.2.2:8787 (solo entonces se permite HTTP)
        val servidor = (project.findProperty("servidor") as String?) ?: "https://bingo.carevalojesus.com"
        buildConfigField("String", "SERVIDOR", "\"$servidor\"")
        manifestPlaceholders["httpPermitido"] = servidor.startsWith("http://").toString()
    }

    // Clave de firma: android/firma/ (NO se sube a git; guarda una copia de seguridad)
    val firma = rootProject.file("firma/firma.properties")
    if (firma.exists()) {
        val p = Properties().apply { firma.inputStream().use(::load) }
        signingConfigs {
            create("release") {
                storeFile = rootProject.file(p.getProperty("storeFile"))
                storePassword = p.getProperty("storePassword")
                keyAlias = p.getProperty("keyAlias")
                keyPassword = p.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            if (firma.exists()) signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.viewmodel.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)
    implementation(libs.compose.foundation)
    implementation(libs.compose.material3)
    implementation(libs.compose.ui.tooling.preview)
    debugImplementation(libs.compose.ui.tooling)
    implementation(libs.okhttp)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.kotlinx.coroutines.android)
    implementation(libs.camera.camera2)
    implementation(libs.camera.lifecycle)
    implementation(libs.camera.view)
    implementation(libs.mlkit.barcode)
    testImplementation(libs.junit)
}
