# kotlinx.serialization: conservar los serializadores generados
-keepattributes *Annotation*, InnerClasses
-keep,includedescriptorclasses class pe.carevalojesus.bingoshow.**$$serializer { *; }
-keepclassmembers class pe.carevalojesus.bingoshow.** { *** Companion; }
-keepclasseswithmembers class pe.carevalojesus.bingoshow.** { kotlinx.serialization.KSerializer serializer(...); }
