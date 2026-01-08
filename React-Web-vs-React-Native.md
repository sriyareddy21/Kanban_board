### Research Note: React Web vs React Native 

### Similarities & Differences Between React Web and React Native

Introduction
React Web and React Native are both developed by Facebook and share the same core principles. While React Web is used to build browser-based applications, 
React Native is used to build mobile applications for Android and iOS. This note summarizes my understanding of how both technologies are similar and how they differ.

### Similarities Between React Web and React Native

1.Component-Based Architecture
Both use reusable components to build the UI.

2.JSX Syntax
JSX is used in both to define UI structure in JavaScript.

3.State and Props
Data is managed using state and passed between components using props.

4.React Hooks
Hooks like useState and useEffect work in a similar way in both.

5.Unidirectional Data Flow
Data flows from parent to child components, making the application predictable.

6.Logic Reusability
Core logic such as validation, calculations, and API calls can be reused across web and mobile.

### Differences Between React Web and React Native

1.Platform Target

- React Web → Browsers

- React Native → Mobile devices (Android & iOS)

2.UI Elements

 -  React Web uses HTML elements like div, span, button

 - React Native uses native components like View, Text, TouchableOpacity

3.Styling

 - React Web uses CSS or CSS frameworks

 - React Native uses JavaScript-based styling (StyleSheet or inline styles)

4.Rendering

- React Web renders to the DOM

- React Native renders to native UI components (no DOM)


### Conclusion

React Native allows developers to leverage their React Web knowledge to build native mobile applications. Although UI components and styling differ, the shared 
concepts make it easier for developers to move between web and mobile development.

5.Navigation

- React Web uses browser-based routing

- React Native uses mobile navigation patterns (stack, tabs, drawer)
