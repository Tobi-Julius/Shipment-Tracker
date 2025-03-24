import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Back } from "@/assets/illustrations";
import { ThemedButton, ThemedText, ThemedTextInput } from "../index";
import { Colors, defaultStyles, fonts, Scale } from "@/constants";
import { KeyBoardAvoidingWrapper } from "../KeyboardAvoidingView";
import {
  validateEmail,
  validatePassword,
  validateUrl,
} from "@/utils/validation";
import { useRouter } from "expo-router";

interface FormData {
  url: string;
  username: string;
  password: string;
}

interface Errors {
  url: string;
  username: string;
  password: string;
}

interface LoginProps {
  onDismiss: () => void;
}

export const Login: React.FC<LoginProps> = ({ onDismiss }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    url: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    url: "",
    username: "",
    password: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const validateField = (field: keyof FormData, value: string) => {
    switch (field) {
      case "url":
        if (!validateUrl(value)) {
          setErrors((prev) => ({
            ...prev,
            url: "URL must be valid",
          }));
        } else {
          setErrors((prev) => ({ ...prev, url: "" }));
        }
        break;
      case "username":
        if (value.length < 1) {
          setErrors((prev) => ({
            ...prev,
            username: "Please, provide a valid username or email address",
          }));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          setErrors((prev) => ({
            ...prev,
            password:
              "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
    }
  };

  const isUrlValid = validateUrl(formData.url);
  const isEmailValid = formData.username.length > 1;
  const isPasswordValid = validatePassword(formData.password);
  const isValid = isUrlValid && isEmailValid && isPasswordValid;

  const handleSubmit = () => {
    if (isValid) {
      onDismiss();
      router.push("/(tabs)");
    } else {
      Alert.alert("Validation Error", "Please correct the errors in the form");
    }
  };

  return (
    <View style={[defaultStyles.containerWhite, styles.container]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onDismiss}
        style={styles.topNav}
      >
        <Back />
        <ThemedText style={styles.topNavTitle}>Cancel</ThemedText>
      </TouchableOpacity>
      <KeyBoardAvoidingWrapper behavior="padding">
        <ThemedText style={styles.title} type="title">
          Login
        </ThemedText>
        <ThemedText style={styles.subtitle} type="subtitle">
          {`Please enter your First, Last name and your\nphone number in order to register`}
        </ThemedText>
        <View style={styles.inputContainer}>
          <ThemedTextInput
            type="url"
            label="URL"
            value={formData.url}
            onChangeText={(text) => handleInputChange("url", text)}
            style={errors.url ? styles.errorInput : undefined}
          />
          {errors.url && (
            <ThemedText style={styles.errorText}>{errors.url}</ThemedText>
          )}

          <ThemedTextInput
            label="Username / Email"
            value={formData.username}
            onChangeText={(text) => handleInputChange("username", text)}
            style={errors.username ? styles.errorInput : undefined}
          />
          {errors.username && (
            <ThemedText style={styles.errorText}>{errors.username}</ThemedText>
          )}

          <ThemedTextInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry={true}
            style={errors.password ? styles.errorInput : undefined}
          />
          {errors.password && (
            <ThemedText style={styles.errorText}>{errors.password}</ThemedText>
          )}
        </View>
      </KeyBoardAvoidingWrapper>

      <View style={styles.buttonWrapper}>
        <ThemedButton
          color={isValid ? Colors.white : Colors.grayText2}
          textStyle={styles.buttonText}
          title="Login"
          type={isValid ? "default" : "primary"}
          onPress={() => handleSubmit()}
          style={{ width: "100%" }}
          disabled={isValid ? false : true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flex: 1,
  },
  topNav: {
    ...defaultStyles.flexRow,
    gap: Scale.pixelSizeHorizontal(10),
  },
  topNavTitle: {
    fontFamily: fonts.medium,
    fontSize: Scale.fontPixel(17),
    color: Colors.primaryText,
  },
  title: {
    fontFamily: fonts.semiBold,
    marginVertical: Scale.pixelSizeVertical(15),
  },
  subtitle: {
    fontFamily: fonts.regular,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: Scale.pixelSizeVertical(3),
    width: "100%",
    alignItems: "center",
    gap: Scale.pixelSizeVertical(10),
  },
  inputContainer: {
    marginVertical: Scale.pixelSizeVertical(20),
    gap: Scale.pixelSizeVertical(5),
  },
  textInput: {
    marginVertical: Scale.pixelSizeVertical(15),
  },
  buttonText: {
    fontSize: Scale.fontPixel(16),
    fontFamily: fonts.semiBold,
  },
  errorText: {
    fontSize: Scale.fontPixel(12),
    marginBottom: Scale.pixelSizeVertical(5),
    color: Colors.putawayText,
  },
});
