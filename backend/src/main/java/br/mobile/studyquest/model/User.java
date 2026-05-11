package br.mobile.studyquest.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Check;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Data
@Entity
@Table(name = "tb_users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false, unique = true)
    private String email;

    @Column (nullable = false)
    private String firstName;

    @Column (nullable = false)
    private String lastName;

    @Column (nullable = false, unique = true)
    private String username;

    @Column (nullable = false)
    private String password;

    private Integer level = 1;
    private Integer xp = 0;
    private Integer streak = 0;

    @Column (nullable = false)
    @Check(constraints = "age > 0")
    private Integer age;

    public String getNickname() {
        return this.username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
