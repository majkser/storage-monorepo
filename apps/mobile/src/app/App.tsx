import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { File } from 'shared-frontend/src/lib/shared-types';
import { User } from 'shared-frontend/src/lib/shared-types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleGoogleLogin = async () => {
    window.location.href = `http://localhost:5000/api/auth/google`;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAllFiles();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = (await response.json()) as User;
        setUser(data);
      }
    } catch (error) {
      //stay on login page
      console.log(error);
    } finally {
      console.log(user);
    }
  };

  async function fetchAllFiles(): Promise<void> {
    try {
      const res = await fetch(`http://localhost:5000/api/files/userfiles`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await res.json();
      console.log('Fetched files:', data);
      setFiles(data.files as File[]);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to the App</Text>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {files.map((file) => (
          <View key={file.id} style={styles.fileItem}>
            <Text style={styles.fileText}>{file.originalName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fileText: {
    fontSize: 16,
    margin: 8,
    color: '#333',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  fileItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
