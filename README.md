# LibraryBarcodeScanner
React-Native Android Application that once authenticated allows the user to scan a book at the coresponding library, recieving information and gaining the ability to check it out. Using Firebase to authenticate and hold data the app has the abilities to login, make new account, and change password with email support. Once logged in any books check out are displayed to the user as well as when they must be returned. Overdue books are highlighted in red. Going to scan a books barcode results in the appropriate data being displayed along with the option to checkout the book notifying user and adding it to list. There are error screens for lack of internet, invalid barcode, and already checked out books.

## Getting Started
The React Native Application is currently unable to be run.
At current because of AndroidX integration libraries are unstable and failing to merge resulting in inability to run. Though the project recorded in it's presented state is linked below.

## View Project
[![LibraryBarcodeScanner Youtube](http://img.youtube.com/vi/tqfVqFaJ02o/0.jpg)](http://www.youtube.com/watch?v=tqfVqFaJ02o "LibraryBarcodeScanner")

## Built With

* [React-Native](https://developer.android.com/) - Framework
* [Firebase](https://firebase.google.com/) - Storage Medium
* [Google MLKit](https://developers.google.com/ml-kit/) - Machine Learning Library Used For Real Time Barcode Scanning
* [React-Native-Firebase](https://github.com/invertase/react-native-firebase) - Connect And Use Real Time Updates
* [React-Native-Camera](https://github.com/react-native-community/react-native-camera) - Use Device Camera And Implement Barcode Reading
* [React-Native-Navigation](https://github.com/wix/react-native-navigation) - Enables Navigation Across Different Components
* [React-Native-Gesture-Handler](https://www.npmjs.com/package/react-native-gesture-handler) - Used For React-Native-Navigation
* [React-Native-Push-Notification](https://github.com/zo0r/react-native-push-notification) - Allows The Use and Set Of Notifications

## Flaws, Fixes, and TODO

* Code cleanup and removal of dead code
* Manipulation of barcode scanner to specify area
* Review and clean up login screen for smoother transfer
* Improve UI to be more friendly
* Implement selection of checkout time - TODO
* Use Geo Location to only allow checkout in appropriate library - TODO


## Authors

* **[Adrian Gonzalez Madruga](https://github.com/Adrian-Gonzalez-Madruga)** - *Implementation of Camera, HomeScreen, ScannerScreen, InformationScreen, TextBox, Google MLKit Integration, Product and User Firebase Setup* 
* **[Moiz Ali Khan](https://github.com/khmoiz/)** - *Implementation of Firebase Authentication, Email Support, LoginScreen, RegisterScreen, ForgotPasswordScreen, Firebase Credentials and Email Setup*

