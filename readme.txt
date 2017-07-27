使用ReactNative结合高德地图api实现的基于地理位置的聊天App

生产发布版本apk
1、Android 签名文件生成 ，使用 key tool 命令生成签名秘钥
windows cmd 执行命令
"keytool -genkey -v -keystore zhangsj-release-key.keystore  -alias zhangsj-key-alias -keyalg RSA -keysize 2048 -validity 10000"
生成zhangsj-release-key.keystore文件，在C:\Users\sjzhang目录下
2、Gradle 配置
    在android /app 文件夹下面 添加文件zhangsj-release-key.keystore
（1）修改项目中 gradle.properties
    添加： MYAPP_RELEASE_STORE_FILE=zhangsj-release-key.keystore
           MYAPP_RELEASE_KEY_ALIAS=zhangsj-key-alias
           MYAPP_RELEASE_STORE_PASSWORD=zhangsj
           MYAPP_RELEASE_KEY_PASSWORD=zhangsj
    这一步我们是进行全局的 gradlde 进行变量化的配置
（2）给应用添加签名 - 配置局部应用 Gradle 文件
        直接在工程目录下得 android /app/build.gradle 中以下节点添加如下内容 :

        ...
        android {
            ...
            defaultConfig { ... }
            signingConfigs {
                        release {
                            storeFile file(MYAPP_RELEASE_STORE_FILE)
                            storePassword MYAPP_RELEASE_STORE_PASSWORD
                            keyAlias MYAPP_RELEASE_KEY_ALIAS
                            keyPassword MYAPP_RELEASE_KEY_PASSWORD
                        }
                 }
            buildTypes {
                release {
                    ...
                    signingConfig signingConfigs.release
                }
            }
        }
        …
3、生成签名包apk
    cd android && ./gradlew assembleRelease

    ./gradlew assembleDebug 编译并打Debug包
    ./gradlew assembleRelease 编译并打Release的包    update
