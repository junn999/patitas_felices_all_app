// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, 
  signOut, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, UserCredential, reauthenticateWithCredential, getAuth, updatePassword, EmailAuthProvider, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  loginWithGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  registerWithEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  /**
   * Método para saber el correo del usuario que tiene la sesión activa.
   * Esto, con el objetivo de usar el correo para el cambio seguro de contraseña. 
  */
  getCorreoUsuarioAutenticado(): string | null {
    const user: User | null = this.auth.currentUser;
    if (user) {
      return user.email;
    }
    return null;
  }

  // Método para enviar correo de restablecimiento de contraseña 
  resetPassword(email: string): Promise<void> { return sendPasswordResetEmail(this.auth, email); }

  /**
    Método para reautenticar el usuario
      Esto se utiliza al momento de cambiar la contraseña, ya que se requiere que se verifique la contraseña
      actual, y, como Firebase no posee un método específico para eso (por seguridad), entonces, 
      se reautentica al usuario, o sea, se verifica su identidad usando la contraseña 
      que él mismo ingresó para poder proseguir con el cambio de la contraseña.
   */
  async reautenticarUsuario(correo: string, contrasenaActual: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No hay ningún usuario autenticado.');
    }

    const credential = EmailAuthProvider.credential(correo, contrasenaActual);

    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      throw error; // Manejo de errores en el componente
    }
  }

  //Método usado para el cambio de la contraseña
  async cambiarContrasena(nuevaContrasena: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No hay ningún usuario autenticado.');
    }

    try {
      await updatePassword(user, nuevaContrasena);
    } catch (error) {
      throw error; // Manejo de errores en el componente
    }
  }

    /**
   * Analiza los proveedores del usuario autenticado y ejecuta diferentes bloques de código.
   * @param onPasswordProvider Acción a ejecutar si se encuentra el proveedor 'password'.
   * @param onOtherProviders Acción a ejecutar si no se encuentra el proveedor 'password'.
   */
    ejecutarSegunProveedor(
      onPasswordProvider: () => void,
      onOtherProviders: () => void
    ): void {
      const user: User | null = this.auth.currentUser;
  
      if (user) {
        const hasPasswordProvider = user.providerData.some(
          (provider) => provider.providerId === 'password'
        );
  
        if (hasPasswordProvider) {
          onPasswordProvider();
        } else {
          onOtherProviders();
        }
      } else {
        console.error('No hay un usuario autenticado.');
      }
    }
}
