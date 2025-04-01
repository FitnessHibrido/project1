export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          birthdate: string | null
          phone: string | null
          instagram: string | null
          goals: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          birthdate?: string | null
          phone?: string | null
          instagram?: string | null
          goals?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          birthdate?: string | null
          phone?: string | null
          instagram?: string | null
          goals?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      measurements: {
        Row: {
          id: string
          profile_id: string
          date: string
          weight: number | null
          height: number | null
          chest: number | null
          waist: number | null
          hips: number | null
          biceps_left: number | null
          biceps_right: number | null
          thigh_left: number | null
          thigh_right: number | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          date?: string
          weight?: number | null
          height?: number | null
          chest?: number | null
          waist?: number | null
          hips?: number | null
          biceps_left?: number | null
          biceps_right?: number | null
          thigh_left?: number | null
          thigh_right?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          date?: string
          weight?: number | null
          height?: number | null
          chest?: number | null
          waist?: number | null
          hips?: number | null
          biceps_left?: number | null
          biceps_right?: number | null
          thigh_left?: number | null
          thigh_right?: number | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          profile_id: string
          program_id: string | null
          week_number: number | null
          day_number: number | null
          start_time: string
          end_time: string | null
          total_volume: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          program_id?: string | null
          week_number?: number | null
          day_number?: number | null
          start_time?: string
          end_time?: string | null
          total_volume?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          program_id?: string | null
          week_number?: number | null
          day_number?: number | null
          start_time?: string
          end_time?: string | null
          total_volume?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      workout_exercises: {
        Row: {
          id: string
          workout_id: string
          exercise_name: string
          sets: Json
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          workout_id: string
          exercise_name: string
          sets?: Json
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          workout_id?: string
          exercise_name?: string
          sets?: Json
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}